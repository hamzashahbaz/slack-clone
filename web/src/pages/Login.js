import React from 'react';
import { Input, Container, Header, Button } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

const loginMutation = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			refreshToken
			errors {
				path
				message
			}
		}
	}
`;

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		errors: {},
	};
	onChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	onSubmit = async () => {
		console.log(this.state);
		const response = await this.props.mutate({ variables: this.state });
		console.log(response);
		const { ok, token, refreshToken, errors } = response.data.login;
		if (ok) {
			localStorage.setItem('token', token);
			localStorage.setItem('refreshToken', refreshToken);
			this.props.history.push('/');
		} else {
			const err = {};
			errors.forEach(({ path, message }) => {
				err[`${path}`] = message;
			});
			this.setState({ errors: err });
		}
	};
	render() {
		const { email, password, errors } = this.state;
		console.log(errors);
		return (
			<Container text>
				<Header as='h2'>Login</Header>
				<Input error={!!this.state.errors.email} name='email' value={email} onChange={this.onChange} placeholder='email' fluid />
				<Input error={!!this.state.errors.password} name='password' type='password' value={password} onChange={this.onChange} placeholder='password' fluid />
				<Button onClick={this.onSubmit}>Register</Button>
			</Container>
		);
	}
}
export default withRouter(graphql(loginMutation)(Login));
