import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SideNav from "./components/SideNav/SideNav";
import Profile from "./views/Profile/Profile";
import Test from "./views/Test/Test";
import Practice from "./views/Practice/Practice";
import Read from "./views/Read/Read";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<SideNav />
			<main className="mainContent" id="mainContent">
				<Switch>
					<Route path="/read">
						<Read />
					</Route>
					<Route path="/practice">
						<Practice />
					</Route>
					<Route path="/test">
						<Test />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
				</Switch>
			</main>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
