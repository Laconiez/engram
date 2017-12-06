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
    answers: DataTypes.JSON,
    enabled: DataTypes.BOOLEAN,
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Topic);
    Question.belongsTo(models.Article);
  };

  return Question;
};
