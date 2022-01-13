//Imports
const bcrypt= require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

//Routes
module.exports = {
    //SIGNUP
    signup: function(req, res){
        //params
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const admin = req.body.isAdmin;

        if (username == null || email == null || password == null){
            return res.status(400).json({ 'error' : 'missing parameters'});
        }

        //check if user exist
        models.user.findOne({
            attributes: ['email'],
            where: {email : email}
        })
        .then(function(userFound){
            if (!userFound){
                //encrypted password
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

    //LOGIN
    login: function(req, res){
        //params
        const email = req.body.email;
        const password = req.body.password;
        
        if(email == null || password == null){
            return res.status(400).json({ 'error': 'missing parameters'});
        }

        //check if user exist
        models.user.findOne({
            where: {email : email}
        })
        .then(function(userFound){
            if(userFound){
                //check if password is valid
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateUserToken(userFound)
                        });
                    }
                    else{
                        return res.status(403).json({ 'error': 'invalid password'});
                    }
                });
            }
            else{
                return res.status(404).json({ 'error': 'user does not exist in DB'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user'});
        });
    }
}