const express = require('express');

const Sequelize = require('sequelize');
const Dotenv = require('dotenv');
Dotenv.config();

const helmet = require("helmet");

const app = express();

const sequelize = new Sequelize(process.env.NAME_BDD, process.env.USER_BDD, process.env.PWD_BDD, {
    dialect: 'mysql'
});

sequelize.authenticate().then (() => {
    console.log("Connection successful!");
}).catch((err) => {
    console.log("Error connecting to database");
});

/* app.use(helmet());

app.use("/api/");
app.use("/api/home");
app.use("/api/profile");
app.use("/api/feed"); */

module.exports = app;
