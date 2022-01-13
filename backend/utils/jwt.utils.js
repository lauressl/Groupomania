//Imports
const jwt = require('jsonwebtoken');

const Dotenv = require('dotenv');
Dotenv.config();

const secretToken = process.env.JWT_SIGN_SECRET;
//Exported functions

module.exports = {
    generateUserToken: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        secretToken,
        {
            expiresIn: '1h'
        })
    }
}