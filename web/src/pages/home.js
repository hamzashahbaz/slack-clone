import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const users = gql`
	{
		users {
			id
			email
		}
	}
`;

const Home = () => {
	const { loading, error, data } = useQuery(users);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	return data.users.map((u) => <h1 key={u.id}>{u.email}</h1>);
};

export default Home;
