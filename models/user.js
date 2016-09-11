/**
 * Created by juan on 09-09-16.
 */
"use strict";
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
    } , {
        classMethods: {
            associate: function(models){
                User.hasMany(models.Rol)
            }
        }
    });
    return User;
}