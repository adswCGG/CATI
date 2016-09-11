var express = require("express");
var app=express();
var bodyParser = require('body-parser');
var models  = require('../models/index.js');

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());



app.get("/",function (req,res) {
    console.log(req.session.name);
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
    res.render("login.html")

})

app.post("/login", function (req,res,next) {
    try {
        models.User.find({where: {username: req.body.username}}).then(function (user) {
            if(user !== null){
                if (req.body.password == user.password) {
                    req.session.name = user.username;
                    req.session.save();
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

app.get("/:nombre",function (req,res) {
    res.render('index.html', { title: req.params.nombre})
})

module.exports = app;