/**
 * Created by juan on 06-11-16.
 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    var Audio = sequelize.define("Audio", {
        duracion: DataTypes.STRING
    } , {
        classMethods: {
            associate: function(models){
                Audio.hasMany(models.Encuesta)
                Audio.belongsTo(models.User,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
                Audio.belongsTo(models.Dato,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
            }
        }
    });
    return Audio;
}