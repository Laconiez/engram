module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caption: {
      type: DataTypes.STRING(300),
      validate: { len: [5, 300] },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
    },
  });

  Topic.associate = (models) => {
    Topic.hasMany(models.Article);
    Topic.hasMany(models.Question);
  };

  return Topic;
};
