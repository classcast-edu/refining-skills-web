import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
// import { firestoreReducer } from "redux-firestore";
import practiceBySubjectReducer from "./praticeBySubjectReducer";
import readReducer from "./readReducer";
import instituteReducer from "./instituteReducer";
export const rootReducer = combineReducers({
	firebase: firebaseReducer,
	// firestore: firestoreReducer,

	instituteId: instituteReducer,
	readables: readReducer,
	subjects: practiceBySubjectReducer,
});
