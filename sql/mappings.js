const Sequelize = require('sequelize');

function setupMappings(sequelize) {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      validate: { isEmail: true },
    },
  });

  const Topic = sequelize.define('topic', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caption: {
      type: Sequelize.STRING(300),
      validate: { len: [5, 300] },
    },
    enabled: {
      type: Sequelize.BOOLEAN,
    },
  });

  const Article = sequelize.define('article', {
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
        model: Topic,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  });

  const Question = sequelize.define('question', {
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
        model: Topic,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    article_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Article,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  });

  return { User, Topic, Article, Question };
}

module.exports = setupMappings;
