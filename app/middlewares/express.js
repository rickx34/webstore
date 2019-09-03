const ROUNDING_DP = 2;

const roundOff = (req, res) => {
  let { overallTotal } = res.locals;
  overallTotal = parseFloat(overallTotal.toFixed(ROUNDING_DP));
  res.locals.overallTotal = overallTotal;
  res.json(res.locals);
};

// The reason this middleware is created is to abstract
// away tiny low details of the rounding number to 2 dp
//
// Programmer can foucus on business logic and let the app
// abstract away rounding off and
//
// One might have other calculations in other parts of
// the system and have to remember to round off float results
//
// This also makes changes easier if one might decide to
// change requirements from 2dp to 3dp

module.exports = { roundOff };
