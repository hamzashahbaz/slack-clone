import bcrypt from 'bcrypt';

import formatErrors from '../helpers/formatErrors';
import { tryLogin } from '../helpers/auth';

export default {
	Query: {
		user: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
		users: (parent, args, { models }) => models.User.findAll(),
	},
	Mutation: {
		login: (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
		register: async (parent, args, { models }) => {
			try {
				const user = await models.User.create(args);
				return {
					ok: true,
					user,
				};
			} catch (e) {
				return {
					ok: false,
					errors: formatErrors(e),
				};
			}
		},
	},
};
