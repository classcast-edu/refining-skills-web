import { Redirect, Route, Switch } from "react-router-dom";

//read routes
import Read from "views/Read/Read";
import ReadStandAloneBook from "views/Read/ReadStandAloneBook";
import FilteredRead from "views/Read/FilteredRead";
import ReadBook from "views/Read/ReadBook";

//practice routes
import Practice from "views/Practice/Practice";
import SinglePractice from "views/Test/SingleTest/SinglePractice";

// Shared
import SubjectModules from "views/Shared/SubjectModules";
import PerSubjectPractice from "views/Shared/PerSubjectPractice";

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
          <Route path="/admin/read/book">
            <ReadStandAloneBook />
          </Route>
          <Route path="/admin/test/read/book">
            <ReadStandAloneBook />
          </Route>
          <Route path="/admin/read/:id/:bookId">
            <ReadBook />
          </Route>
          <Route path="/admin/read/:id">
            <FilteredRead />
          </Route>
          <Route path="/admin/read">
            <Read />
          </Route>
          <Route path="/admin/practice/:id/:courseId/:testId">
            <div className="w-70">
              <SinglePractice />
            </div>
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

          <Route path="/admin/test/:courseId/:testId">
            <div className="w-70">
              <SingleTest />
            </div>
          </Route>
          <Route path="/admin/test/:courseId">
            <div className="w-70">
              <SubjectModules />
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
