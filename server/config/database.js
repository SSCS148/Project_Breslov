
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('postgresql://Database_Project_owner:BvQ56KoscnJM@ep-tiny-firefly-a1wy3w9a.ap-southeast-1.aws.neon.tech/Database_Project?sslmode=require', {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Utilisez ceci si votre serveur de base de données utilise un certificat auto-signé
    }
  }
});

module.exports = sequelize;