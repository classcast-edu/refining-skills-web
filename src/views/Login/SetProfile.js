import axios from "axios";
import FormikControl from "components/Formik/FormikControl";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import style from "./login.module.css";
import RsIcon from "../../assets/RsIcon.svg";

const SetProfile = () => {
	const firebase = useFirebase();
	const history = useHistory();

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

	const saveDataInDatabase = async (values) => {
		let phone = authFireBase.phoneNumber.replace("+91", "");
		var data = {
			...values,
			phone_number: phone,
			username: phone,
			email: phone + "" + "@gmail.com ",
			standard: 14,
		};
		await axios.post("/users/updateprofile", data);
		history.push("/admin");
	};

	const onSubmit = async (values) => {
		const user = firebase.auth().currentUser;
		user
			.updateProfile({
				displayName: values.firstname + " " + values.lastname,
			})
			.then(function () {
				saveDataInDatabase(values);
				// return history.push("/admin/test");
			});
	};
	return (
		<div className={style.container}>
			<Formik
				initialValues={{ firstname: "", lastname: "" }}
				onSubmit={onSubmit}
			>
				<Form className={style.box1}>
					<FormikControl
						control="input"
						type="text"
						name="firstname"
						label="First Name"
					/>
					<FormikControl
						control="input"
						type="text"
						name="lastname"
						label="Last Name"
					/>
					{/* <FormikControl
						control="radio"
						name="gender"
						options={[
							{ id: "Male", name: "Male" },
							{ id: "Female", name: "Female" },
						]}
					/> */}
					<button className="btn-primary" type="submit">
						Submit
					</button>
					<img className={style.logo} src={RsIcon} alt="refining-skills" />
				</Form>
			</Formik>
		</div>
	);
};

export default SetProfile;
