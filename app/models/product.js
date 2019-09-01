const Sequelize = require('sequelize');
const { sequelize } = require('../db/connect');

const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = { Product };
