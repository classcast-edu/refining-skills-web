import { Router, Switch, Route, Link, Redirect } from "react-router-dom";

import SideNav from "./components/SideNav/SideNav";
import Profile from "./views/Profile/Profile";
import Test from "./views/Test/Test";
import Practice from "./views/Practice/Practice";
import Read from "./views/Read/Read";
import Login from "views/Login/Login";
import DashBoardLayout from "components/Layout/DashBoardLayout";
import history from "./history";
import PrivateRoute from "components/PrivateRoute";
const App = () => {
	return (
		<Router history={history}>
			<PrivateRoute path="/admin" component={DashBoardLayout} />
			<Route path="/auth/login">
				<Login />
			</Route>
			<Redirect from="*" to="/admin" />
		</Router>
	);
};

export default App;
