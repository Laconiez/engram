const Sequelize = require('sequelize');

module.exports = (topic, article) => ({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.STRING(3000),
  },
  enabled: Sequelize.BOOLEAN,
  topic_id: {
    type: Sequelize.INTEGER,
    references: {
      model: topic,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  article_id: {
    type: Sequelize.INTEGER,
    references: {
      model: article,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});
