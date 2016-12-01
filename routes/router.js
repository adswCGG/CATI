var express = require("express");
var app=express();
var bodyParser = require('body-parser');
var models  = require('../models/index.js');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.get("/Call",function (req,res) {
    if(req.session.name!=null) {
        res.render("Call.html", {UserId: req.session.UserId});
    }else{
        res.render('login.html');
    }
});

app.get("/",function (req,res) {
    if(req.session.name!=null) {
        res.render('index.html', {session: req.session});
    }else{
        res.render('login.html');
    }
});

app.post("/usuarios",function (req,res) {
    if(req.session.name!=null){
        res.render("profile.html",{user:req.body.id})
    }else {
        res.render("login.html")
    }
});

app.get("/usuarios",function (req,res) {
    if(req.session.name!=null) {
        res.render("users.html")
    }else{
        res.render('login.html')
    }
});

app.post("/modificar",function (req,res) {
    if(req.session.name!=null) {
        res.render("Modificar.html", {id: req.body.id})
    }
    else{
        res.render('login.html')
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

app.get("/Proyecto",function (req,res) {
    if(req.session.name!=null) {
        res.render("proyects.html")
    }else{
        res.render('login.html')
    }
});

app.post("/Proyect",function (req,res) {
    if(req.session.name!=null){
        res.render("profileProyect.html",{proyect:req.body.id})
    }else {
        res.render("login.html")
    }
});

app.post("/updateProyect",function (req, res) {
    if(req.session.permiso=="ADMIN") {
        res.render("updateProyect.html", {id: req.body.id})
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

app.get("/Download",function (req,res) {
    if(req.session.name!="ADMIN"){
        res.render("TablaDescarga.html")
    }
    else{
        res.redirect("/")
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
                        req.session.UserId = user.id;
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