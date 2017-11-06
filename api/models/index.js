const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  operatorsAliases: false,
  host: config.db.host,
  dialect: 'postgres',

  pool: {
    max: 3,
    min: 0,
    idle: 10000,
  },
});

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
