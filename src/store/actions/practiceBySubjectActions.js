import axios from "axios";
import { FETCH_SUBJECTS_FAIL } from "store/constants/practiceConstants";
import { FETCH_SUBJECTS_REQUEST } from "store/constants/practiceConstants";
import { FETCH_SUBJECTS_SUCCESS } from "store/constants/practiceConstants";

export const fetchSubjects = () => async (dispatch, getState) => {
	const instituteId = getState().instituteId;
	dispatch({ type: FETCH_SUBJECTS_REQUEST });
	try {
		const res = await axios(`/clients/get_subjects_context/${instituteId}/`);
		return dispatch({ type: FETCH_SUBJECTS_SUCCESS, payload: res.data.data });
	} catch (error) {
		return dispatch({ type: FETCH_SUBJECTS_FAIL });
	}
};
