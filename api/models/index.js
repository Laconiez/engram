const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const userMap = require('./user');
const topicMap = require('./topic');
const articleMap = require('./article');
const questionMap = require('./question');

const db = {};

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass);

sequelize.define('user', userMap);
sequelize.define('topic', topicMap);
sequelize.define('article', articleMap);
sequelize.define('question', questionMap);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
