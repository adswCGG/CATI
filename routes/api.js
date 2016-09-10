/**
 * Created by juan on 10-09-16.
 */
var express = require('express');
var router= express.Router();
var bodyParser = require('body-parser');
var app=express();
var models  = require('../models/index.js');

module.exports = router;

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

router.get("/usuarios", function (req,res) {
    models.User.findAll().then(function (user) {
        res.render('users.html', {resultado: user});
    });
})

router.route('/usuarios/:id')
    .get(function(req,res)
    {
        console.log("noope")
        models.User.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (user) {
            res.render('users.html', {title: 'Listar Usuarios', resultado: user});
        });
    })
    .put(function (req,res) {
        models.User.find({where: {id: req.params.id} }).then(function() {
            if(req.body.username){
                if(req.body.email) {
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
        })
    })
    .delete(function(req,res)
    {
        console.log("casiiiii");
        models.User.destroy({where: {id: req.params.id} }).then(function () {
            return models.User.findAll().then(function (user) {
                res.json(user);
            })
        })
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
