import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
// import { firestoreReducer } from "redux-firestore";
import practiceBySubjectReducer from "./praticeBySubjectReducer";
import readReducer from "./readReducer";
export const rootReducer = combineReducers({
	firebase: firebaseReducer,
	// firestore: firestoreReducer,

	instituteId: function a(state = null) {
		return state;
	},
	readables: readReducer,
	subjects: practiceBySubjectReducer,
});
