const Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: Sequelize.STRING(30000),
  enabled: Sequelize.BOOLEAN,
  topic_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'topics',
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
};
