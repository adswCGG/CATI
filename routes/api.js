/**
 * Created by juan on 10-09-16.
 */
var express = require('express');
var router= express.Router();
var bodyParser = require('body-parser');
var app=express();
var models  = require('../models/index.js');
var fs = require("fs");

module.exports = router;

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

router.get("/usuarios", function (req,res) {
    models.User.findAll().then(function (user) {
        res.render('users.html', {resultado: user});
    });
})

router.get('/usuarios/:id',function(req,res) {

    models.User.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        res.render('users.html', {title: 'Listar Usuarios', resultado: user});
    });
})

router.post('/usuarios/:id',function(req,res) {
    if (req.body.method == "PUT") {
        models.User.find({where: {id: req.params.id}}).then(function (user) {
            if (req.body.username) {
                if (req.body.email) {
                    user.updateAttributes({
                        username: req.body.username,
                        email: req.body.email
                    }).then(function (result) {
                        res.send(result);
                    })
                }
                else {
                    user.updateAttributes({
                        username: req.body.username
                    }).then(function (result) {
                        res.send(result);
                    })
                }

            }
            else if(req.body.email){
                user.updateAttributes({
                    email: req.body.email
                }).then(function (result){
                    res.send(result);
                })
            }
            })
        }
    else if (req.body.method == "DELETE") {
        console.log("casiiiii");
        models.User.destroy({where: {id: req.params.id}}).then(function (user) {
            return models.User.findAll().then(function (user) {
                res.redirect("/")
            })
        })
    }
})


router.post("/usuarios", function (req,res) {
    models.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(function (result) {
        models.Rol.create({
            permiso: req.body.permiso,
            UsuarioId: result.id
        });
        res.redirect("/");
    });
})

router.post("/login", function (req,res,next) {
    try {
        models.User.find({where: {username: req.body.username}}).then(function (user) {
            if(user !== null){
                if (req.body.password == user.password) {
                    console.log("login");
                }
                else {
                    console.log("contraseña erronea");
                }
            }
            else{
                console.log("error de usuario");
            }
        });
    }

    catch(ex){
        console.log("error de usuario");
    }
    res.redirect("/");
});