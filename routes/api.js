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


router.get("/logout",function (req,res) {
    if(req.session.name){
        req.session.destroy();
    }
    res.redirect("/")
});

router.get("/baseDatosLlamar",function (req,res) {
        models.Dato.findAll({
            where: {
                estado: {
                    ne: "si"
                }
        }
    }).then(function (dato){
            res.json(dato);
        })
});
router.post('/baseDatosLlamar/:id',function(req,res) {
    models.Dato.find({where: {id: req.params.id}}).then(function (user) {
        user.updateAttributes({
            estado: req.body.text
        });
            res.json(user);
    });
})

router.get("/baseDatos",function (req,res) {
    if(req.session.permiso == "ADMIN") {
        models.Dato.findAll().then(function (dato){
            res.render('tabla.html',{datos: dato});
        })
    }
    else {
        res.redirect("/");
    }
});

router.get("/Proyecto",function (req,res) {
    models.Proyect.findAll().then(function (proyect) {
        res.render('proyects.html',{resultado: proyect});
    })
});

router.post("/Proyect",function (req,res) {
    models.Proyect.create({
        nombre: req.body.nombre
    });
    res.redirect("/");
});

router.post('/Proyect/:id',function(req,res) {
    if (req.body.method == "PUT") {
        models.Proyect.find({where: {id: req.params.id}}).then(function (proyect) {
            proyect.updateAttributes({
                nombre: req.body.nombre
            }).then(function (result) {
                res.redirect("/");
            })
        })
    }
    else if (req.body.method == "DELETE") {
        models.Proyect.destroy({where: {id: req.params.id}}).then(function (proyect) {
            return models.Proyect.findAll().then(function (proyect) {
                res.redirect("/");
            })
        })
    }
});


router.get("/usuarios", function (req,res) {
    if (req.session.permiso == "ADMIN") {
        models.User.findAll().then(function (user) {
            res.render('users.html', {resultado: user});
        })
    }
    else {
        res.redirect("/");
    }
});


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
});


router.get('/usuarios/:id',function(req,res) {

    models.User.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        res.render('users.html', {title: 'Listar Usuarios', resultado: user});
    });
});

router.post('/usuarios/:id',function(req,res) {
    if (req.body.method == "PUT") {
        models.User.find({where: {id: req.params.id}}).then(function (user) {
            if (req.body.username) {
                if (req.body.email) {
                    user.updateAttributes({
                        username: req.body.username,
                        email: req.body.email
                    }).then(function (result) {
                        res.redirect("/");
                    })
                }
                else {
                    user.updateAttributes({
                        username: req.body.username
                    }).then(function (result) {
                        res.redirect("/");
                    })
                }

            }
            else if(req.body.email){
                user.updateAttributes({
                    email: req.body.email
                }).then(function (result){
                    res.redirect("/");
                })
            }
            })
        }
    else if (req.body.method == "DELETE") {
        models.User.destroy({where: {id: req.params.id}}).then(function (user) {
            return models.User.findAll().then(function (user) {
                res.redirect("/");
            })
        })
    }
});



router.post("/CargarArchivo", function (req,res) {
    fs.readFile(req.body.archivo.path,'utf8',function read(err,allText) {
        if (err){
            throw err;
        }
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
                var tarr = [];
                for (var j=0; j<headers.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        for(var i=0;i<lines.length;i++){
            models.Dato.create({
                nombre: lines[i][0],
                apellido: lines[i][1],
                numero: lines[i][2],
                estado: lines[i][3]
            })
        }
        console.log(req.body.archivo.path);
        res.render("MostrarDatos.html", {datos: lines} );
    })
});



module.exports = router;