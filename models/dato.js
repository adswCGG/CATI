/**
 * Created by juan on 11-09-16.
 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    var Dato = sequelize.define("Dato", {
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        numero: DataTypes.STRING,
        estado: DataTypes.STRING

    } , {
        classMethods: {
            associate: function (models) {
                Dato.belongsTo(models.Proyect, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    });
    return Dato;
};