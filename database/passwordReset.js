const sequelize = require("sequelize");
const connection = require("./database");

const passwordReset = connection.define('passwordReset',{
    Token:{
        type: sequelize.STRING,
        allowNull: false
    },
    Email:{
        type: sequelize.STRING,
        allowNull: false
    },
    Use:{
        type: sequelize.BIGINT,
        allowNull: false
    }
})

passwordReset.sync({force: false}).then(()=>{});
module.exports = passwordReset;