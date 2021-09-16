import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "views/Login/Login";
import DashBoardLayout from "components/Layout/DashBoardLayout";
import history from "./history";
import PrivateRoute from "components/PrivateRoute";
import { useSelector } from "react-redux";
import axios from "axios";
import SetProfile from "views/Login/SetProfile";
import { Toaster, resolveValue, toast } from "react-hot-toast";
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

  axios.defaults.baseURL =
    "https://rsb-dot-subtle-palisade-304215.el.r.appspot.com";
  axios.defaults.headers["Authorization"] = accessToken;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <Router history={history}>
      <Toaster
        position="bottom-right"
        containerStyle={{
          fontSize: 20,
        }}
      />
      <Switch>
        <PrivateRoute path="/admin" component={DashBoardLayout} />
        <Route path="/auth/login">
          <Login />
        </Route>
        <Route path="/auth/setProfile">
          <SetProfile />
        </Route>
        <Redirect from="*" to="/admin" />
      </Switch>
    </Router>
  );
};

export default App;
