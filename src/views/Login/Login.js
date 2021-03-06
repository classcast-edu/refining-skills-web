import FormikControl from "components/Formik/FormikControl";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import style from "./login.module.css";
import RsIcon from "../../assets/RsIcon.svg";
import Rsa from "../../assets/RSA.png";
import MobileStoreButton from "react-mobile-store-button";

import axios from "axios";
const Login = (props) => {
	const firebase = useFirebase();
	const history = useHistory();
	const [showOtpScreen, setShowOtpScreen] = useState(false);
	const [mobileNumber, setMobileNumber] = useState("");
	const [error, setError] = useState("");
	const authFireBase = useSelector((state) => state.firebase.auth);

	useEffect(() => {
		if (authFireBase.uid) {
			history.push(
				// props.location.state
				// 	? props.location.state.from.pathname
				// :
				"/admin"
			);
		}
		// eslint-disable-next-line
	}, [authFireBase]);

	useEffect(() => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"sign-in-button",
			{
				size: "invisible",
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					// console.log(response);
					// console.log("hello");
					// onSignInSubmit();
				},
			}
		);
	});

	const signIn = (phoneNumber, submitProps) => {
		const appVerifier = window.recaptchaVerifier;
		firebase
			.auth()
			.signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
				setShowOtpScreen(true);
				setMobileNumber(phoneNumber);
				submitProps.setSubmitting(false);
				return (window.confirmationResult = confirmationResult);
			})
			.catch((err) => {
				setError(err.message);
				submitProps.setSubmitting(false);
			});
	};

	const initialValues = {
		phoneNumber: "",
		code: "",
	};

	const checkIfUserExists = async (token) => {
		const res = await axios.get("/users/check_if_user_exists", {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (res.data.status) {
			history.push("/admin");
		} else history.push("/auth/setProfile");
	};
	const onSubmit = (values, submitProps) => {
		submitProps.setSubmitting(true);
		if (showOtpScreen) {
			return window.confirmationResult
				.confirm(values.code)
				.then((result) => {
					checkIfUserExists(result.user.ya);
					submitProps.setSubmitting(false);
				})
				.catch((error) => {
					setError(error.message);
					submitProps.setSubmitting(false);
				});
		}
		signIn(`+91${values.phoneNumber}`, submitProps);
	};
	const [disable, setDisable] = useState(true);
	const validatePhoneNumber = (value) => {
		setError("");
		if (!/^\d+$/.test(value)) {
			// setError("Type only numbers");

			setDisable(true);
		} else if (value.length < 10) {
			setDisable(true);
		} else setDisable(false);
	};

	return (
		<>
			<header className={style.header}>
				<img
					src={Rsa}
					alt="rsacademy"
					className={style.headerLogo}
					height="56"
				/>
				<MobileStoreButton
					store="android"
					url={
						"https://play.google.com/store/apps/details?id=com.classcast.rsacademy"
					}
					// linkProps={{ title: "iOS Store Button" }}
				/>
			</header>
			<div className={style.container}>
				<div className={style.box2}></div>
				<div className={style.paragraph}>
					<h1 className={style.title}>Start Learning Now</h1>
					<h4 className={style.subtitle}>
						The main focus of the website is to provide a fun, exciting and
						interactive mode of learning which a child cherishes through the
						intelligent learning journey for attaining their academic goals in
						the most smoothest way possible.
					</h4>
				</div>
				<div className={style.box1}>
					<h2 className="primary">
						{showOtpScreen ? `Enter OTP sent to ${mobileNumber} ` : "Login "}
					</h2>

					<Formik initialValues={initialValues} onSubmit={onSubmit}>
						{(formik) => (
							<Form>
								<div className={style.loginLabel}>
									{!showOtpScreen && (
										<div className={style.numberInput}>+91</div>
									)}
									<FormikControl
										control={"input"}
										type="tel"
										name={showOtpScreen ? "code" : "phoneNumber"}
										// maxlength="10"
										pattern="\d*"
										maxlength="10"
										placeholder={showOtpScreen ? null : "Enter 10-digit number"}
										validate={!showOtpScreen && validatePhoneNumber}
										// label="Phone Number"
									/>
								</div>
								<p className="text-align-center">{error}</p>
								<div id="sign-in-button"></div>
								<button
									className="btn-primary sign-in-button"
									type="submit"
									disabled={!formik.dirty || formik.isSubmitting || disable}
								>
									{showOtpScreen ? "Submit" : "Get OTP"}
								</button>
								{showOtpScreen && (
									<p
										onClick={() => {
											setError("");
											return setShowOtpScreen(false);
										}}
									>
										Go back to the login screen ?
									</p>
								)}
							</Form>
						)}
					</Formik>
					<img className={style.logo} src={RsIcon} alt="refining-skills" />
				</div>
			</div>
		</>
	);
};

export default Login;
