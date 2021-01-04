import SideNav from "components/SideNav/SideNav";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Practice from "views/Practice/Practice";
import Profile from "views/Profile/Profile";
import Read from "views/Read/Read";
import Test from "views/Test/Test";

const DashBoardLayout = () => {
	return (
		<>
			<SideNav />
			<main className="mainContent" id="mainContent">
				<Switch>
					<Route path="/admin/read">
						<Read />
					</Route>
					<Route path="/admin/practice">
						<Practice />
					</Route>
					<Route path="/admin/test">
						<Test />
					</Route>
					<Route path="/admin/profile">
						<Profile />
					</Route>
					<Redirect from="*" to="/admin/profile" />
				</Switch>
			</main>
		</>
	);
};

export default DashBoardLayout;
