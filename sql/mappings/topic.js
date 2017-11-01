const Sequelize = require('sequelize');

module.exports = {
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
};
