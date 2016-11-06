/**
 * Created by juan on 11-09-16.
 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    var Dato = sequelize.define("Dato", {
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        estado: DataTypes.STRING,
        numero: DataTypes.STRING

    } , {
        classMethods: {
            associate: function(models){
                Dato.hasMany(models.ProyectDato)
            }
        }
    });
    return Dato;
}