export default (sequelize, DataTypes) => {
	const Message = sequelize.define('messages', {
		text: {
			type: DataTypes.STRING,
		},
	});

	Message.associate = (models) => {
		// 1:n
		Message.belongsTo(models.Channel, {
			foreignKey: {
				name: 'channelId',
				field: 'channel_id',
			},
		});
		Message.belongsTo(models.User, {
			foreignKey: {
				name: 'userId',
				field: 'user_id',
			},
		});
	};

	return Message;
};
