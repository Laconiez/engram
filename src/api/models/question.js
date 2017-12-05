const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING(3000),
    },
    enabled: DataTypes.BOOLEAN,
    topic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Topics',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    article_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Articles',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Topic);
    Question.belongsTo(models.Article);
  };

  return Question;
};
