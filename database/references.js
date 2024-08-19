const sequelize = require("sequelize");
const connection = require("./database");
const project = require("./project")

const ReferencesRoute = connection.define('ReferencesRoute',{
    Name:{
        type: sequelize.STRING,
        allowNull: false
    },
    Route:{
        type: sequelize.STRING,
        allowNull: false
    },
    Type:{
        type: sequelize.STRING,
        allowNull: false
    }
})

project.hasMany(ReferencesRoute);
ReferencesRoute.belongsTo(project);

ReferencesRoute.sync({force: false}).then(()=>{});
module.exports = ReferencesRoute;
