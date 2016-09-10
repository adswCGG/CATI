var express = require("express");
var app=express();
var bodyParser = require('body-parser');
var models  = require('../models/index.js');

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());


app.get("/",function (req,res) {
    res.render('index.html',{title: "Hola mundo"});
})

app.get("/usuarios",function (req,res) {
    res.redirect("api/usuarios")
})

app.get("/CreateUser",function (req,res) {
    res.render('CreateUser.html')
})

app.get("/modificar",function (req,res) {
    res.render("Modificar.html")
})

app.post("/usuarios", function (req,res) {
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

app.get("/:nombre",function (req,res) {
    res.render('index.html', { title: req.params.nombre})
})

module.exports = app;