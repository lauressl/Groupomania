//Imports
const bcrypt= require('bcrypt');
const jwt =require('jsonwebtoken');
const models = require('../models');

//Routes
module.exports = {
    signup: function(req, res){
        //params
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const admin = req.body.isAdmin;

        if (username == null || email == null || password == null){
            return res.status(400).json({ 'error' : 'missing parameters'});
        }

        models.user.findOne({
            attributes: ['email'],
            where: {email : email}
        })
        .then(function(userFound){
            if (!userFound){
                bcrypt.hash(password, 5, function(err, bcryptedPwd){
                    const newUser = models.user.create({
                        username: username,
                        email: email,
                        password: bcryptedPwd,
                        isAdmin: 0
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'error': 'cannot add user'});
                    });
                });
            }
            else{
                return res.status(200).json({ 'error': 'user already exist'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user'});
        })
    },
    login: function(req, res){
        //TODO
    }
}