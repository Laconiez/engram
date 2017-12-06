module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caption: DataTypes.STRING(150),
    text: DataTypes.TEXT,
    enabled: DataTypes.BOOLEAN,
  });

  Article.associate = (models) => {
    Article.belongsTo(models.Topic);
  };

  return Article;
};
