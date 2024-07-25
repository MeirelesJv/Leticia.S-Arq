const sequelize = require("sequelize");
const connection = require("./database");
const project = require("./project")

const References = connection.define('References',{
    Name:{
        type: sequelize.STRING,
        allowNull: false
    },
    Route:{
        type: sequelize.STRING,
        allowNull: false
    }
})

project.hasMany(References);
References.belongsTo(project);

References.sync({force: false}).then(()=>{});
module.exports = References;