export const changeInstitute = (payload) => (dispatch) => {
	window.localStorage.setItem("refiningSkillsInstituteId", payload);
	window.localStorage.setItem("readables", []);
	return dispatch({ type: "CHANGE_INSTITUTE", payload });
};
