const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('mydatabaseProject', 'myuser', 'sacha1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432',
  logging: false,
});

module.exports = sequelize;