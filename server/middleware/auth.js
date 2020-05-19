import { refreshTokens } from '../helpers/auth';
import models from '../models';

const SECRET = 'dsfdfsdfdsfdsffff';
const SECRET2 = 'dsfdfsdfdsfdsffffdd';

export default async (req, res, next) => {
	const token = req.headers['x-token'];
	if (token) {
		try {
			const { user } = jwt.verify(token, SECRET);
			req.user = user;
		} catch (e) {
			const refreshToken = req.headers['x-refresh-token'];
			const newTokens = await refreshTokens(token, refreshToken, models, SECRET);
			if (newTokens.token && newTokens.refreshToken) {
				res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
				res.set('x-token', newTokens.token);
				res.set('x-refresh-token', newTokens.refreshToken);
			}
			req.user = newTokens.user;
		}
	}
	next();
};
