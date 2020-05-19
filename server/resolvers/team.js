import formatErrors from '../helpers/formatErrors';
import requireAuth from '../helpers/permissions';

export default {
	Mutation: {
		createTeam: requireAuth.createResolver(async (parent, args, { models }) => {
			try {
				await models.Team.create(args);
				return {
					ok: true,
				};
			} catch (e) {
				return {
					ok: false,
					errors: formatErrors(e),
				};
			}
		}),
	},
};
