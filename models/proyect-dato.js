/**
 * Created by juan on 06-11-16.
 */
"use strict"
var Sequelize = require("sequelize");
module.exports=function (sequelize,DataTypes) {
    var ProyectDato = sequelize.define("ProyectDato", {

    } , {
        classMethods :{
            associate: function (models) {
                ProyectDato.belongsTo(models.Proyect,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
                ProyectDato.belongsTo(models.Dato,{
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
            }
        }
    });
    return ProyectDato;
}