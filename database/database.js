const sequelize = require("sequelize");
const connection = new sequelize('LeticiaSArq','teste','123',{
    host: 'localhost',
    dialect: 'mssql',
    timezone: '-03:00'
});

module.exports = connection;