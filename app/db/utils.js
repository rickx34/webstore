const { sequelize } = require('./connect');

/**
 *
 * @param {String} funtionName Name of aggregate function to be used such as `SUM` or `COUNT`
 * @param {String} columnToApply Column to which apply aggregate function on
 */
const aggregateFunction = (funtionName, columnToApply) => sequelize.fn(
  funtionName,
  sequelize.col(columnToApply),
);

module.exports = { aggregateFunction };
