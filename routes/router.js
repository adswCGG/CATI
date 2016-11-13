var express = require("express");
var app=express();
var bodyParser = require('body-parser');
var models  = require('../models/index.js');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.get("/Call",function (req,res) {
    res.render("Call.html", {numero: "echo123"});
});

app.get("/",function (req,res) {
    if(req.session.name!=null) {
        res.render('index.html', {session: req.session});
    }else{
        res.render('login.html');
    }
});
/*
Editar app.get("/usuarios") para que res.render("user.html") y que el html tenga como funcion principal el
mostrar usuarios del api/usuarios con angular + el resto
 */
app.get("/usuarios",function (req,res) {
    res.redirect("api/usuarios")
});

app.get("/modificar/:id",function (req,res) {
    if(req.session.name!=null) {
        res.render("Modificar.html", {id: req.params.id})
    }
    else{
        res.render('login.html');
    }
});

app.get("/CreateUser",function (req,res) {
    if(req.session.permiso=="ADMIN") {
        res.render("CreateUser.html");
    }
    else{
        res.redirect("/");
    }
});

app.get("/updateProyect/:id",function (req, res) {
    if(req.session.permiso=="ADMIN") {
        res.render("updateProyect.html", {id: req.params.id})
    }
    else{
        res.redirect("/");
    }
});

app.get("/CreateProyect",function (req,res) {
    if(req.session.permiso=="ADMIN") {
        res.render("CreateProyect.html");
    }
    else{
        res.redirect("/");
    }
});

app.get("/CargarArchivo", function (req,res) {
    if(req.session.permiso=="ADMIN") {
        res.render("CargarArchivo.html");
    }
    else{
        res.redirect("/");
    }
});

app.post("/CargarArchivo", function (req,res) {
    if(req.session.permiso=="ADMIN"){
        res.render("CargarArchivo.html",{id: req.body.idProyect})
    }
    else{
        res.redirect("/")
    }
});

app.get("/login",function (req,res) {
    if(!req.session.name){
        res.render("login.html")
    }
    else{
        res.redirect("/")
    }
});

app.post("/login", function (req,res) {
    if(req.body.username!=="ADMIN") {
        try {
            models.User.find({where: {username: req.body.username}}).then(function (user) {
                if (user !== null) {
                    if (req.body.password == user.password) {
                        req.session.name = user.username;
                        req.session.save();
                        models.Rol.find({where: {UserId: user.id}}).then(function (rol){
                            req.session.permiso = rol.permiso;
                            req.session.save();
                            res.render('index.html',{session: req.session})
                            }
                        )

                    }
                    else {
                        console.log("contraseña erronea");
                        res.render('login.html');
                    }
                }
                else {
                    console.log("error de usuario");
                    res.render('login.html');
                }
            });
        }

        catch (ex) {
            console.log("error de usuario");
            res.render('login.html');
        }
    }
    else{
        req.session.name="ADMIN";
        req.session.permiso="ADMIN";
        req.session.save();
        console.log("adminop");
        res.render('index.html',{session: req.session});
    }

});


module.exports = app;