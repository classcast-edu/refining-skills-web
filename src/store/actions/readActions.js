import axios from "axios";
import { FETCH_READ_SUCCESS } from "store/constants/readConstants";
import { FETCH_READ_FAIL } from "store/constants/readConstants";
import { FETCH_READ_REQUEST } from "store/constants/readConstants";
import _ from "lodash";
export const fetchReadables = () => async (dispatch, getState) => {
	const instituteId = getState().instituteId;
	dispatch({ type: FETCH_READ_REQUEST });
	try {
		const res = await axios(`/content/readable_context/${instituteId}/`);
		window.localStorage.setItem(
			"readables",
			JSON.stringify(_.keyBy(res.data.data, "id"))
		);
		dispatch({ type: FETCH_READ_SUCCESS, payload: res.data.data });
	} catch (error) {
		dispatch({ type: FETCH_READ_FAIL, payload: error.message });
	}
};
