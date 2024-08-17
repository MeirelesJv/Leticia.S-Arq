const sequelize = require("sequelize");
const connection = new sequelize('Leticia','root','J0@0V1T0Rjv',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;