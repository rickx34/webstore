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
    type: Sequelize.DECIMAL(10, 2),
    get() {
      // Workaround until sequelize issue #8019 is fixed
      return parseFloat(this.getDataValue('price'));
    },
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = { Product };
