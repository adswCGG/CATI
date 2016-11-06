/**
 * Created by juan on 06-11-16.
 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    var Encuesta = sequelize.define("Encuesta", {
        nombre: DataTypes.STRING,
        url: DataTypes.STRING
    } , {
        classMethods: {
            associate: function(models){
                Encuesta.belongsTo(models.Audio,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
                Encuesta.belongsTo(models.Dato,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
                Encuesta.belongsTo(models.Proyect,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
            }
        }
    });
    return Encuesta;
}