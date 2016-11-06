/**
 * Created by juan on 06-11-16.
 */
"use strict"
var Sequelize = require("sequelize");
module.exports=function (sequelize,DataTypes) {
    var UserProyect = sequelize.define("UserProyect", {
        encuestasRealizadas: DataTypes.STRING,
        minTrabajados: DataTypes.STRING
    } , {
        classMethods :{
            associate: function (models) {
                UserProyect.belongsTo(models.User,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
                UserProyect.belongsTo(models.Proyect,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
            }
        }
    });
    return UserProyect;
}