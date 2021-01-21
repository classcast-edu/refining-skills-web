import { FETCH_SUBJECTS_SUCCESS } from "store/constants/practiceConstants";
import _ from "lodash";
const initialState = {};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case FETCH_SUBJECTS_SUCCESS:
			return _.keyBy(payload, "id");
		default:
			return state;
	}
};
