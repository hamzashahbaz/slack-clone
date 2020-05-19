export default (sequelize, DataTypes) => {
	const Channel = sequelize.define('channels', {
		name: {
			type: DataTypes.STRING,
		},
		public: {
			type: DataTypes.BOOLEAN,
		},
	});

	Channel.associate = (models) => {
		// 1:n
		Channel.belongsTo(models.Team, {
			foreignKey: {
				name: 'teamId',
				field: 'team_id',
			},
		});
		Channel.belongsToMany(models.User, {
			through: 'channel_member',
			foreignKey: {
				name: 'channelId',
				field: 'channel_id',
			},
		});
	};

	return Channel;
};
