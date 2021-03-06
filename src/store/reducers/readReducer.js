import { FETCH_READ_SUCCESS } from "store/constants/readConstants";
import { FETCH_READ_FAIL } from "store/constants/readConstants";
import { FETCH_READ_REQUEST } from "store/constants/readConstants";
import _ from "lodash";
const initialState = {
	types: {
		1: {
			id: 1,
			name: "Mind Maps",
		},
		2: {
			id: 2,
			name: "Past Year",
		},
		3: {
			id: 3,
			name: "Revision Notes",
		},
		4: {
			id: 4,
			name: "Textbooks",
		},
		5: {
			id: 5,
			name: "Formulas",
		},
		6: {
			id: 6,
			name: "Solutions",
		},
	},
	loading: false,
	loaded: false,
	data: {},
	// data: JSON.parse(
	// 	JSON.stringify(window?.localStorage.getItem("readables") ?? {})
	// ),
	error: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case FETCH_READ_REQUEST:
			return { ...state, loading: true, loaded: false };
		case FETCH_READ_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: _.keyBy(payload, "id"),
			};
		case FETCH_READ_REQUEST:
			return { ...state, loading: false, loaded: false, error: payload };
		default:
			return state;
	}
};
