const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: DataTypes.STRING(30000),
    enabled: DataTypes.BOOLEAN,
    topic_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'topics',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  });

  Article.associate = (models) => {
    Article.belongsTo(models.Topic);
  };

  return Article;
};
