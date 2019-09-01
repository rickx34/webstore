const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'example', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    throw new Error('Unable to connect to the database');
  });

module.exports = { sequelize };
