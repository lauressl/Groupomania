//Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const models = require("./models");

const Sequelize = require('sequelize');
const Dotenv = require('dotenv');
Dotenv.config();

const helmet = require("helmet");

const app = express();

//bodyParser config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//requetes
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

app.get("/", function (req, res) {
    res.send(`<meta http-equiv="refresh" content="0; url=${process.env.FRONT_URL}"/>`)
});

//Sync database
const sequelize = new Sequelize(process.env.NAME_BDD, process.env.USER_BDD, process.env.PWD_BDD, {
    dialect: 'mysql',
    define :
    {freezeTableName: true}
});

sequelize.authenticate().then (() => {
    console.log("Connection to database successful!");
}).catch((err) => {
    console.log("Error connecting to database");
});

models.sequelize.sync({alter : true}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});

const profileRoutes = require ('./routes/profile');
const homeRoutes = require ('./routes/home');
const feedRoutes = require ('./routes/feed');



app.use(helmet());

app.use("/api/profile", profileRoutes);
//app.use("/api/");
app.use("/api/home", homeRoutes);

app.use("/api/feed", feedRoutes);

module.exports = app;
