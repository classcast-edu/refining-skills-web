import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import SideNav from "./components/SideNav/SideNav";
import Profile from "./views/Profile/Profile";
import Test from "./views/Test/Test";
import Practice from "./views/Practice/Practice";
import Read from "./views/Read/Read";
const App = () => {
	return (
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
					<Route exact path="/">
						<Redirect from="*" to="/profile" />
					</Route>
				</Switch>
			</main>
		</Router>
	);
};

export default App;
