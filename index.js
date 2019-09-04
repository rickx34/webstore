const express = require('express');
const path = require('path');
const { Product, Cart } = require('./app/models');
const { aggregateFunction } = require('./app/db');
const { roundOff } = require('./app/middlewares');

const app = express();
const port = 3000;

const send500Http = (message, response) => {
  response.status(500);
  response.json({ message });
};

// For demo
app.get('/', async (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

// Products API
app.get('/products', async (req, res) => {
  const allProducts = await Product.findAll({
    attributes: [['id', 'productId'], 'name', 'price'],
  }).catch((error) => {
    console.error('Error fetching products resource', error);
    send500Http('Error fetching prodcts', res);
  });

  res.json(allProducts);
});


// Cart API
app.get('/cart/products', async (req, res, next) => {
  // required: true performs a inner join
  const allProductsUnderCart = await Product.findAll({
    include: [{ model: Cart, required: true, attributes: [] }],
    attributes: [
      ['id', 'productId'],
      'name',
      'price',
      [aggregateFunction('COUNT', 'productId'), 'quantity'],
      [aggregateFunction('SUM', 'price'), 'total'], // Already handles rounding off to 2dp
    ],
    group: ['name', 'price', 'product.id'],
  }).catch((error) => {
    console.error('Error fetching products from cart', error);
    send500Http('Error fetching products from cart', res);
  });

  const overallTotal = allProductsUnderCart
    .reduce((accumulator, currentValue) => accumulator + currentValue.get('total'), 0);

  const links = [
    {
      rel: 'self',
      method: 'GET',
      href: '/cart/products',
    },
    {
      rel: 'create',
      method: 'POST',
      title: 'Adding product to cart',
      href: '/cart/products/:productId',
    },
    {
      rel: 'delete',
      method: 'DELETE',
      title: 'Deleting product from cart',
      href: '/cart/products/:productId',
    },
  ];

  // It is recommended you explicitly add keys to locals
  // instead of setting locals as a whole
  res.locals.products = allProductsUnderCart;
  res.locals.overallTotal = overallTotal;
  res.locals.links = links;

  // go to next middleware and make sure that the
  // response contains 2dp rounded off floats.
  next();
}, roundOff);

app.post('/cart/products/:productId', async (req, res) => {
  const { productId } = req.params;

  const newCartItem = await Cart.create({ productId })
    .catch((error) => {
      console.error('Error inserting products under resource', error);

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(404);
        res.json({ message: 'Product does not exist' });
      }
      send500Http('Error posting products under cart', res);
    });

  res.json({ cartItemId: newCartItem.dataValues.id, productId: newCartItem.dataValues.productId });
});

app.delete('/cart/products/:productId', async (req, res) => {
  const { productId } = req.params;

  await Cart.destroy({ where: { productId }, limit: 1 })
    .catch((error) => {
      console.error('Error deleting products under resource', error);
      send500Http('Error deleting products from cart', res);
    });

  res.json(undefined);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
