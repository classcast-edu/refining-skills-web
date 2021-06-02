import history from "../../history";
import { fetchSubjects } from "./practiceBySubjectActions";

export const changeInstitute = (payload) => (dispatch) => {
	window.localStorage.setItem("refiningSkillsInstituteId", payload);
	window.localStorage.setItem("readables", []);

	history.push("/admin");
	dispatch(fetchSubjects());
	return dispatch({ type: "CHANGE_INSTITUTE", payload });
};
