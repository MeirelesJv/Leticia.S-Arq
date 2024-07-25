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
        type: sequelize.BIGINT,
        allowNull: false
    },
    Obs: {
        type: sequelize.STRING,
        allowNull: false
    },
    ArchitecturalProject: {
        type: sequelize.STRING,
        allowNull: true
    },
    Mockup: {
        type: sequelize.STRING,
        allowNull: true
    },
    NeedProgram: {
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