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
        type: sequelize.TEXT,
        allowNull: false
    },
    RenderApi: {
        type: sequelize.TEXT,
        allowNull: true
    },
    Prancha: {
        type: sequelize.TEXT,
        allowNull: true
    },
    File: {
        type: sequelize.STRING,
        allowNull: true
    },
    FileRoute: {
        type: sequelize.STRING,
        allowNull: true
    },
    ImgPrinc: {
        type: sequelize.STRING,
        allowNull: true
    },
    Status: {
        type: sequelize.BIGINT,
        allowNull: false
    },
    Uuid: {
        type: sequelize.STRING,
        allowNull: true
    },
})

users.hasMany(Project);
Project.belongsTo(users);

Project.sync({ force: false }).then(() => { });
module.exports = Project;