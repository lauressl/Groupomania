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
    dialect: 'mysql'
});

models.sequelize.sync({ force: true }).then(result => {
    console.log(result);
    app.listen(3000);
}).catch(err => {
    console.log(err);
});

sequelize.authenticate().then (() => {
    console.log("Connection to database successful!");
}).catch((err) => {
    console.log("Error connecting to database");
});

app.use(helmet());

/*app.use("/api/");
app.use("/api/home");
app.use("/api/profile");
app.use("/api/feed"); */

module.exports = app;
