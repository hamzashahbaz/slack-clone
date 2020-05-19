import React from 'react';
import decode from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from './home';
import Register from './register';
import Login from './Login';
import CreateTeam from './createTeam';
import ViewTeam from './teams/view';

const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	try {
		decode(token);
		decode(refreshToken);
	} catch (e) {
		return false;
	}
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated() ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default () => (
	<Router>
		<div>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/view-team' exact component={ViewTeam} />
				<PrivateRoute path='/create-team' exact>
					<CreateTeam />
				</PrivateRoute>
			</Switch>
		</div>
	</Router>
);
