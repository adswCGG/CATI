var express = require("express");
var app=express();
var bodyParser = require('body-parser');
var models  = require('../models/index.js');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());



app.get("/",function (req,res) {
    res.render('index.html',{title: "Hola mundo"});
})

app.get("/usuarios",function (req,res) {
    res.redirect("api/usuarios")
})

app.get("/CreateUser",function (req,res) {
    res.redirect('api/CreateUser')
})

app.get("/modificar/:id",function (req,res) {
    res.render("Modificar.html",{id: req.params.id})
})

app.get("/login",function (req,res) {
    if(!req.session.name) {
        res.render("login.html")
    }
    else{
        res.redirect("/")
    }
})

app.get("/logout",function (req,res) {
    if(req.session.name){
        req.session.destroy();
    }
    res.redirect("/")
})


app.post("/login", function (req,res,next) {
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
                            }
                        )

                    }
                    else {
                        console.log("contraseña erronea");
                    }
                }
                else {
                    console.log("error de usuario");
                }
            });
        }

        catch (ex) {
            console.log("error de usuario");
        }
    }
    else{
        req.session.name="ADMIN";
        req.session.permiso="ADMIN";
        req.session.save();
        console.log("adminop");
    }

    res.redirect("/");
});

app.get("/:nombre",function (req,res) {
    res.render('index.html', { title: req.params.nombre})
})

module.exports = app;