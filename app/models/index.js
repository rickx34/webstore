const { Product } = require('../models/product');
const { Cart } = require('../models/cart');

// Create products, cart tables and indexes along with it done
// via `sync`. products table created with seed data

Product.hasMany(Cart);

Product.sync({ force: true }).then(() => {
  console.log('table created');
  Product.create({
    name: 'portal gun',
    price: '123.89',
  });

  Product.create({
    name: 'mr meeseeks box',
    price: '500.99',
  });

  Product.create({
    name: 'pickle rick',
    price: '200.85',
  });

  Product.create({
    name: 'laser gun',
    price: '54.32',
  });

  Product.create({
    name: 'robot talking dog',
    price: '65.12',
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
