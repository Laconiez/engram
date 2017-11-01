const Sequelize = require('sequelize');
const configDB = require('../config/config.json').db;

const userMap = require('./mappings/user');
const articleMap = require('./mappings/article');
const questionMap = require('./mappings/question');
const topicMap = require('./mappings/topic');

function createDBConnection() {
  return new Sequelize(configDB.name, configDB.user, configDB.pass, {
    operatorsAliases: false,
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 3,
      min: 0,
      idle: 10000,
    },
  });
}

function defineModels(sequelize) {
  const Topic = sequelize.define('user', topicMap);
  const Article = sequelize.define('article', articleMap(Topic));
  const Question = sequelize.define('question', questionMap(Topic, Article));
  const User = sequelize.define('user', userMap);
}

module.exports = { createDBConnection, defineModels };
