const { Product } = require('../models/product');
const { Cart } = require('../models/cart');

// Create products, cart tables and indexes along with it done
// via `sync`. products table created with seed data

Product.hasMany(Cart);

Product.sync({ force: true }).then(() => {
  console.log('table created');
  Product.create({
    name: 'Sledgehammer',
    price: 125.76,
  });

  Product.create({
    name: 'Axe',
    price: 190.51,
  });

  Product.create({
    name: 'Bandsaw',
    price: 562.14,
  });

  Product.create({
    name: 'Chisel',
    price: 13.9,
  });

  Product.create({
    name: 'Hacksaw',
    price: 19.45,
  });

  Cart.sync({ force: true }).then(() => {
    console.log('Cart table created');
  }).catch((error) => {
    console.error('Error creating Cart table', error);
    throw new Error('Error creating cart table');
  });
}).catch((error) => {
  console.error(error);
  throw new Error('Error creating table');
});

module.exports = { Cart, Product };
