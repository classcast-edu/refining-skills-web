import { FETCH_SUBJECTS_SUCCESS } from "store/constants/practiceConstants";
const initialState = {};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case FETCH_SUBJECTS_SUCCESS:
			return payload;
		default:
			return state;
	}
};
