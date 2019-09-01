const express = require('express');
const { Product, Cart } = require('./app/models');
const { sequelize } = require('./app/db/connect');

const app = express();
const port = 3000;

const send500Http = (message, response) => {
  response.status(500);
  response.json({ message });
};

app.get('/products', async (req, res) => {
  const allProducts = await Product.findAll({
    attributes: [['id', 'productId'], 'name', 'price'],
    raw: true,
  }).catch((error) => {
    console.error('Error fetching products resource', error);
    send500Http('Error fetching prodcts', res);
  });

  res.json(allProducts);
});

// Cart API
app.get('/cart/products', async (req, res) => {
  // required: true performs a inner join
  const result = await Product.findAll({
    include: [{ model: Cart, required: true, attributes: [] }],
    attributes: [
      'name',
      'price',
      [sequelize.fn('COUNT', sequelize.col('productId')), 'quantity'],
      [sequelize.fn('SUM', sequelize.col('price')), 'total'],
    ],
    group: ['name', 'price', 'productId'],
    raw: true,
  });

  res.json(result);
});

app.post('/cart/products/:productId', async (req, res) => {
  const { productId } = req.params;

  const result = await Cart.create({ productId }).catch((error) => {
    console.error('Error inserting products under resource', error);
    res.status(500);
    res.json({ message: 'Error posting products under cart' });
  });

  res.json({ cartItemId: result.dataValues.id, productId: result.dataValues.productId });
});

app.delete('/cart/products/:productId', async (req, res) => {
  const { productId } = req.params;

  await Cart.destroy({ where: { productId }, limit: 1 }).catch((error) => {
    console.error('Error deleting products under resource', error);
    res.status(500);
    res.json({ message: 'Error deleting cart' });
  });

  res.json(undefined);
});


app.listen(port, () => console.log(`listening on port ${port}!`));
