import React from 'react';
import { Input, Container, Header, Button } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

const createTeamMutation = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			ok
			errors {
				path
				message
			}
		}
	}
`;

class CreateTeam extends React.Component {
	state = {
		name: '',
		errors: {},
	};
	onChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	onSubmit = async () => {
		console.log(this.state);
		const response = await this.props.mutate({ variables: { name: this.state.name } });
		console.log(response);
		const { ok, token, refreshToken, errors } = response.data.createTeam;
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
		const { name, errors } = this.state;
		console.log(errors);
		return (
			<Container text>
				<Header as='h2'>Create a team</Header>
				<Input error={!!this.state.errors.name} name='name' value={name} onChange={this.onChange} placeholder='name' fluid />
				<Button onClick={this.onSubmit}>Register</Button>
			</Container>
		);
	}
}
export default withRouter(graphql(createTeamMutation)(CreateTeam));
