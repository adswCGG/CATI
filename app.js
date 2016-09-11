var express = require("express");
var app = express();
var router = require('./routes/router.js');
var bodyParser = require('body-parser');
var models = require("./models/index.js");
var session = require("express-session");

app.use("/",router);
app.use('/api', require('./routes/api.js'));
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "123swcati098",
    resave: false,
    saveUninitialized: false
}));


//Start Server
models.sequelize.sync().then(function () {
    app.listen(3000);
})