//Imports
const express = require('express');
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
