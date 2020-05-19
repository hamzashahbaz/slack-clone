import _ from 'lodash';
export default (e) => {
	if (e.name === 'SequelizeValidationError') {
		return e.errors.map((x) => _.pick(x, ['path', 'message']));
	}
	return [{ path: 'name', message: 'something went wrong' }];
};
