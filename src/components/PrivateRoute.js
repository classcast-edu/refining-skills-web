import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
function PrivateRoute({ component: Component, ...rest }) {
	const auth = useSelector((state) => state.firebase.auth);
	return (
		<Route
			{...rest}
			render={(props) =>
				isLoaded(auth) && !isEmpty(auth) ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/auth/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

export default PrivateRoute;
