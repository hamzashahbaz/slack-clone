import Sequelize from 'sequelize';

const config = {
	database: 'slack',
	username: 'postgres',
	password: 'postgres',
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
	dialect: 'postgres',
	define: {
		underscored: true,
	},
});

const models = {
	User: sequelize.import('./user'),
	Team: sequelize.import('./team'),
	Channel: sequelize.import('./channel'),
	Message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
