/**
 * Created by juan on 06-11-16.
 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    var Proyect = sequelize.define("Proyect", {
        nombre: DataTypes.STRING
    } , {
            classMethods: {
                associate: function(models){
                    Proyect.hasMany(models.UserProyect)
                    Proyect.hasMany(models.Dato)
                    Proyect.hasMany(models.Encuesta)
                }
            }
        });
    return Proyect;
}