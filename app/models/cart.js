const Sequelize = require('sequelize');
const { sequelize } = require('../db/connect');
const { Product } = require('../models/product');

const Cart = sequelize.define('cart', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
      // Foreign key constraint
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
},
{ indexes: [{ name: 'product_id_index', fields: ['productId'] }] });

module.exports = { Cart };
