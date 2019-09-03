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
    type: Sequelize.FLOAT(9, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = { Product };
