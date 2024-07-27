const sequelize = require("sequelize");
const connection = require("./database");
const users = require("./users");

const Project = connection.define('Project', {
    Approval: {
        type: sequelize.BIGINT,
        allowNull: false
    },
    Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    Service: {
        type: sequelize.STRING,
        allowNull: false
    },
    Obs: {
        type: sequelize.STRING,
        allowNull: false
    },
    File: {
        type: sequelize.STRING,
        allowNull: true
    },
    FileRoute: {
        type: sequelize.STRING,
        allowNull: true
    },
    Status: {
        type: sequelize.BIGINT,
        allowNull: false
    }
})

users.hasMany(Project);
Project.belongsTo(users);

Project.sync({ force: false }).then(() => { });
module.exports = Project;