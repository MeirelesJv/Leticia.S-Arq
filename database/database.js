const sequelize = require("sequelize");
const key = require('../Keys');

const connection = new sequelize('LeticiaSArq','sa',key.databasePassword,{
    host: 'localhost',
    dialect: 'mssql',
    timezone: '-03:00',
    dialectOptions: {
    ssl: {
      rejectUnauthorized: false // Equivalente a trustServerCertificate: true
    }
  }
});

module.exports = connection;