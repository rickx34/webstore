const roundOff2DP = (req, res) => {
  console.log('LOGGED', req.allProducts);
  res.json(req.allProducts);
};

module.exports = { roundOff2DP };
