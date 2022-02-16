//Imports
const bcrypt= require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const validator = require('validator');


//Controlers
module.exports = {
    //*****SIGNUP*****//
    signup: function(req, res){
        //params
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (username === null || email === null || password === null){
            return res.status(400).json({ 'Erreur' : "Tous le schamps sont requis"});
        }

        //Verify user's informations securirty
        let validateMail = validator.isEmail(req.body.email)
        let validatePwd = validator.isStrongPassword(req.body.password)
        
        if(validateMail == false){
            return res.status(200).json( "Veuillez entrer une adresse mail valide")
        }
        if(validatePwd== false){
            return res.status(200).json({ 'Erreur': "Veuillez entrer un mot de passe valide"})
        }
        //check if user exist
        models.user.findOne({
            attributes: ['email'],
            where: {email : email}
        })
        .then(function(userFound){
            if ((!userFound) && (validateMail === true) && (validatePwd === true)){
                //encrypted password
                bcrypt.hash(password, 5, function(err, bcryptedPwd){
                    let attachement;
                        if(req.file){
                        attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                        }
                    const newUser = models.user.create({
                        username: username,
                        email: email,
                        password: bcryptedPwd,
                        attachement: attachement,
                        isAdmin: 0
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'Erreur': "L'utilisateur ne peut pas être créé"});
                    });
                });
            }
            else{
                return res.status(200).json({ 'Erreur': "L'utilisateur existe déjà"});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'Erreur': "L'utilisateur ne peut pas être vérifié"});
        })
    },

    //*****LOGIN*****//
    login: function(req, res){
        //params
        const email = req.body.email;
        const password = req.body.password;
        
        if(email === null || password === null){
            return res.status(400).json({ 'Erreur': "Veuillez entrer un email et un mot de passe"});
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
                        return res.status(201).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateUserToken(userFound),
                            'isAdmin': userFound.isAdmin,
                        });
                    }
                    else{
                        return res.status(403).json({ 'Erreur': "Mot de passe invalide"});
                    }
                });
            }
            else{
                return res.status(403).json({ 'Erreur': "L'utilisateur n'existe pas"});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'Erreur': "L'utilisateur ne peut pas être vérifié"});
        });
    },
}