export const changeInstitute = (payload) => (dispatch) => {
	window.localStorage.setItem("refiningSkillsInstituteId", payload);
	return dispatch({ type: "CHANGE_INSTITUTE", payload });
};
