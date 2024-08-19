const sequelize = require("sequelize");
const connection = new sequelize('LeticiaSArq','sa','J0@0V1T0Rjvv',{
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