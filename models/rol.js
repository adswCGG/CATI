/**
 * Created by juan on 09-09-16.
 */
"use strict"
var Sequelize = require("sequelize");
module.exports=function (sequelize,DataTypes) {
    var Rol = sequelize.define("Rol", {
        permiso: DataTypes.STRING
    } , {
        classMethods :{
            associate: function (models) {
                Rol.belongsTo(models.User,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
            }
        }
    });
    return Rol;
}