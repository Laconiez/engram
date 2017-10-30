const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const sequelize = new Sequelize('engtest', 'engusr', '123', {
  operatorsAliases: false,
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 3,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;
