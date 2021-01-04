import React from "react";
import ReactDOM from "react-dom";

//IMPORTED styles
import "./index.css";

//redux and firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { createStore, applyMiddleware } from "redux";

import {
	ReactReduxFirebaseProvider,
	getFirebase,
	isLoaded,
} from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./store/reducers/1RootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "App";
import { Provider, useSelector } from "react-redux";
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const initialState = {
	accessToken: window && window.localStorage.getItem("accessToken"),
};

const middlewares = [thunk.withExtraArgument(getFirebase)];
const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance, //since we are using Firestore
	// userProfile: "users", // where profiles are stored in database
	// presence: "presence", // where list of online users is stored in database
	// sessions: "sessions",
};

function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth))
		return (
			<div
				className=" d-flex flex-column align-items-center  justify-content-center text-center"
				style={{ height: "15rem", width: "100%" }}
			>
				<strong>Loading ...</strong>
			</div>
		);
	return children;
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<AuthIsLoaded>
					<App />
				</AuthIsLoaded>
			</ReactReduxFirebaseProvider>
		</Provider>
	</React.StrictMode>,

	document.getElementById("root")
);
