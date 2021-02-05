import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "views/Login/Login";
import DashBoardLayout from "components/Layout/DashBoardLayout";
import history from "./history";
import PrivateRoute from "components/PrivateRoute";
import { useSelector } from "react-redux";
import axios from "axios";
import SetProfile from "views/Login/SetProfile";
const App = () => {
	//axios
	axios.interceptors.request.use(
		(request) => {
			// console.log(request);
			// Edit request config
			return request;
		},
		(error) => {
			console.log(error);
			return Promise.reject(error);
		}
	);

	const accessToken = useSelector((state) => {
		if (state.firebase.auth.stsTokenManager)
			return state.firebase.auth.stsTokenManager.accessToken;
	});

	axios.defaults.baseURL = "https://classcast-198812.appspot.com";
	axios.defaults.headers["Authorization"] = accessToken;
	axios.defaults.headers.post["Content-Type"] = "application/json";

	return (
		<Router history={history}>
			<Switch>
				<PrivateRoute path="/admin" component={DashBoardLayout} />
				<Route path="/auth/login">
					<Login />
				</Route>
				<Route path="/auth/setProfile">
					<SetProfile />
				</Route>
				{/* <Route path="/"> */}
				{/* <Redirect push to={"/index.html"} /> */}
				{/* </Route> */}
				{/* <Redirect from="*" to="/admin" /> */}
			</Switch>
		</Router>
	);
};

export default App;
