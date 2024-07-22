const sequelize = require("sequelize");
const connection = require("./database");

const Users = connection.define('Users',{
    Name:{
        type: sequelize.STRING,
        allowNull: false
    },
    Surname:{
        type: sequelize.STRING,
        allowNull: false
    },
    Email:{
        type: sequelize.STRING,
        allowNull: false
    },
    Cpf:{
        type: sequelize.STRING,
        allowNull: false
    },
    Birth:{
        type: sequelize.DATEONLY,
        allowNull: false
    },
    Password:{
        type: sequelize.STRING,
        allowNull: false
    },
    Tel:{
        type: sequelize.BIGINT(11),
        allowNull: false
    },
    Type:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    Cep:{
        type: sequelize.STRING,
        allowNull: false
    },
    Road:{
        type: sequelize.STRING,
        allowNull: false
    },
    Neighborhood:{
        type: sequelize.STRING,
        allowNull: false
    },
    Uf:{
        type: sequelize.STRING,
        allowNull: false,
    },
    City:{
        type: sequelize.STRING,
        allowNull: false,
    }
})

Users.sync({force: false}).then(()=>{});
module.exports = Users;