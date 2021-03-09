import history from "../../history";

export const changeInstitute = (payload) => (dispatch) => {
	window.localStorage.setItem("refiningSkillsInstituteId", payload);
	window.localStorage.setItem("readables", []);

	history.push("/admin");

	return dispatch({ type: "CHANGE_INSTITUTE", payload });
};
