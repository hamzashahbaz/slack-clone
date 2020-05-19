import React from 'react';
import { Input, Container, Header, Button, Form } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

const registerMutation = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			ok
			errors {
				path
				message
			}
		}
	}
`;

class Register extends React.Component {
	state = {
		username: '',
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
		const { ok, errors } = response.data.register;
		if (ok) {
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
		const { username, email, password, errors } = this.state;
		console.log(errors);
		return (
			<Container text>
				<Header as='h2'>Register</Header>
				<Form>
					<Form.Field error={!!this.state.errors.username}>
						<Input name='username' value={username} onChange={this.onChange} placeholder='username' fluid />
					</Form.Field>
					<Form.Field error={!!this.state.errors.email}>
						<Input name='email' value={email} onChange={this.onChange} placeholder='email' fluid />
					</Form.Field>
					<Form.Field error={!!this.state.errors.password}>
						<Input name='password' type='password' value={password} onChange={this.onChange} placeholder='password' fluid />
					</Form.Field>
					<Button onClick={this.onSubmit}>Register</Button>
				</Form>
			</Container>
		);
	}
}
export default withRouter(graphql(registerMutation)(Register));
