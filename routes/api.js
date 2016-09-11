/**
 * Created by juan on 10-09-16.
 */
var express = require('express');
var router= express.Router();
var bodyParser = require('body-parser');
var app=express();
var models  = require('../models/index.js');
var fs = require("fs");



app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


router.get("/usuarios", function (req,res) {

    models.User.findAll().then(function (user) {
        res.render('users.html', {resultado: user});
    });
})

router.get("/CreateUser",function (req,res) {
    if(req.session.permiso=="ADMIN") {
        res.render("CreateUser.html");
    }
    else{
        res.redirect("/");
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
            UserId: result.id
        });
        res.redirect("/");
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

router.get("/CargarArchivo", function (req,res) {
    res.render("CargarArchivo.html")
})

router.post("/CargarArchivo", function (req,res) {
    fs.readFile('./data.csv','utf8',function read(err,data) {
        if (err){
            throw err;
        }
        var nombre
        var apellido
        var numero
        var estado;
        nombre = data[1] + data[2]
        for(var j=40;j<data.length;j++) {
            if(data[j]==" "){
                break
            }
            nombre+=data[j];
        }
        for(var i=j;i<data.length;i++) {
            if(data[i]==" "){
                break
            }
            apellido+=data[i];
        }
        for(var k=i;k<data.length;k++) {
            if(data[k]==" "){
                break
            }
            numero+=data[k];
        }
        for(var l=k;l<data.length;l++) {
            if(data[j]==" "){
                break
            }
            estado+=data[l];
        }
        console.log(nombre);
        res.redirect("/");
    })
})

module.exports = router;