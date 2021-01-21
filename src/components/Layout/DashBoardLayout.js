import { Redirect, Route, Switch } from "react-router-dom";

//read routes
import Read from "views/Read/Read";
import FilteredRead from "views/Read/FilteredRead";
import ReadBook from "views/Read/ReadBook";

//practice routes
import Practice from "views/Practice/Practice";
import PerSubjectPractice from "views/Practice/PracticeBySubject/PerSubjectPractice";
import SubjectModules from "views/Practice/PracticeBySubject/SubjectModules";

//test routes
import Test from "views/Test/Test";
import SingleTest from "views/Test/SingleTest/SingleTest";

import SideNav from "components/SideNav/SideNav";
import Profile from "views/Profile/Profile";

const DashBoardLayout = () => {
	return (
		<>
			<SideNav />
			<main className="mainContent" id="mainContent">
				<Switch>
					<Route path="/admin/read/:id/:bookId">
						<ReadBook />
					</Route>
					<Route path="/admin/read/:id">
						<FilteredRead />
					</Route>
					<Route path="/admin/read">
						<Read />
					</Route>
					<Route path="/admin/practice/:id/:courseId">
						<div className="w-70">
							<SubjectModules />
						</div>
					</Route>
					<Route path="/admin/practice/:id">
						<div className="w-70">
							<PerSubjectPractice />
						</div>
					</Route>
					<Route path="/admin/practice">
						<Practice />
					</Route>
					<Route path="/admin/test/:id">
						<div className="w-70">
							<SingleTest />
						</div>
					</Route>
					<Route path="/admin/test">
						<Test />
					</Route>
					<Route path="/admin/profile">
						<Profile />
					</Route>
					<Redirect from="*" to="/admin/practice" />
				</Switch>
			</main>
		</>
	);
};

export default DashBoardLayout;
