const sequelize = require("sequelize");
const connection = require("./database");
const project = require("./project")

const Workmanship = connection.define('Workmanship',{
    Name:{
        type: sequelize.STRING,
        allowNull: true
    },
    Code:{
        type: sequelize.STRING,
        allowNull: true
    },
    Brand:{
        type: sequelize.STRING,
        allowNull: true
    },
    File:{
        type: sequelize.STRING,
        allowNull: false
    },
    Route:{
        type: sequelize.STRING,
        allowNull: false
    },
    Type:{
        type: sequelize.STRING,
        allowNull: true
    }
})

project.hasMany(Workmanship);
Workmanship.belongsTo(project);

Workmanship.sync({force: false}).then(()=>{});
module.exports = Workmanship;