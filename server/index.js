import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import auth from './middleware/auth';

import models from './models';

const SECRET = 'dsfdfsdfdsfdsffff';
const SECRET2 = 'dsfdfsdfdsfdsffffdd';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const app = express();
app.use(cors('*'));
app.use(auth);

const server = new ApolloServer({
	schema,
	context: (req) => ({
		models,
		user: req.user,
		SECRET,
		SECRET2,
	}),
});

server.applyMiddleware({ app });

models.sequelize.sync({}).then(() => {
	app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
