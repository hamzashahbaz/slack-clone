import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = async (user, secret, secret2) => {
	const createToken = jwt.sign(
		{
			user: _.pick(user, ['id']),
		},
		secret,
		{
			expiresIn: '1h',
		}
	);
	const createRefreshToken = jwt.sign(
		{
			user: _.pick(user, 'id'),
		},
		secret2,
		{
			expiresIn: '7d',
		}
	);
	return [createToken, createRefreshToken];
};
export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
	let userId;
	try {
		const {
			user: { id },
		} = jwt.decode(refreshToken);
		userId = id;
	} catch (e) {
		return {};
	}
	if (!userId) {
		return {};
	}
	const user = await models.User.findOne({ where: { id: userId }, raw: true });
	if (!user) {
		return {};
	}
	const refreshSecret = user.password + SECRET2;
	try {
		jwt.verify(refreshToken, refreshSecret);
	} catch (e) {
		return {};
	}
	const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
	return {
		token: newToken,
		refreshToken: newRefreshToken,
		user,
	};
};
export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
	const user = await models.User.findOne({ where: { email }, raw: true });
	if (!user) {
		return {
			ok: false,
			errors: [{ path: 'email', message: 'Invalid email' }],
		};
	}
	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		return {
			ok: false,
			errors: [{ path: 'password', message: 'Invalid Password' }],
		};
	}
	const refreshTokenSecret = user.password + SECRET2;
	const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);
	return {
		ok: true,
		token,
		refreshToken,
	};
};
