const sequelize = require("sequelize");
const connection = require("./database");

const Project = connection.define('Project',{
    User_id:{
        type: sequelize.STRING,
        allowNull: false
    },
    Approval:{
        type: sequelize.BIGINT,
        allowNull: false
    },
    Name:{
        type: sequelize.STRING,
        allowNull: false
    },
    Service:{
        type: sequelize.BIGINT,
        allowNull: false
    },
    Obs:{
        type: sequelize.STRING,
        allowNull: false
    },
    ArchitecturalProject:{
        type: sequelize.STRING,
        allowNull: true
    },
    Mockup:{
        type: sequelize.STRING,
        allowNull: true
    },
    NeedProgram:{
        type: sequelize.STRING,
        allowNull: true
    },
    Status:{
        type: sequelize.BIGINT,
        allowNull: false
    }
})

Project.sync({force: false}).then(()=>{});
module.exports = Project;