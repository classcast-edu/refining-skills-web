import history from "../../history";
import { USER_LOGIN_REQUEST } from "store/constants/authConstants";
import { USER_LOGOUT } from "store/constants/authConstants";
import { USER_LOGIN_FAIL } from "store/constants/authConstants";
import { USER_LOGIN_SUCCESS } from "store/constants/authConstants";

export const signIn = (phoneNumber) => {
	const appVerifier = window.recaptchaVerifier;
	return (dispatch, getState, getFirebase) => {
		const firebase = getFirebase();
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		firebase
			.auth()
			.signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// dispatch({
				// 	type: USER_LOGIN_SUCCESS,
				// });
				return (window.confirmationResult = confirmationResult);
			})
			.catch((err) => {
				console.log(err.message);
				dispatch({ type: USER_LOGIN_FAIL, payload: err.message });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, getFirebase) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: USER_LOGOUT });
				history.push("/auth/login");
			});
	};
};
