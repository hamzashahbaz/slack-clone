import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			'x-token': token ? token : '',
			'x-refresh-token': refreshToken ? refreshToken : '',
		},
	}));

	return forward(operation);
});

const authAfterware = new ApolloLink((operation, forward) => {
	return forward(operation).map((response) => {
		const {
			response: { headers },
		} = operation.getContext();
		if (headers) {
			const token = headers.get('x-token');
			const refreshToken = headers.get('x-refresh-token');

			if (token) {
				localStorage.setItem('token', token);
			}

			if (refreshToken) {
				localStorage.setItem('refreshToken', refreshToken);
			}
		}

		return response;
	});
});

export default new ApolloClient({
	link: from([authMiddleware, authAfterware, httpLink]),
	cache: new InMemoryCache(),
});

/*const link = authMiddleware.concat(httpLink);
export default new ApolloClient({
	link,
	cache: new InMemoryCache(),
});*/

/*export default new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	request: (operation) => {
		const token = localStorage.getItem('token');
		const refreshToken = localStorage.getItem('refreshToken');
		operation.setContext({
			headers: {
				'x-token': token ? token : '',
				'x-refresh-token': refreshToken ? refreshToken : '',
			},
		});
	},
});*/
