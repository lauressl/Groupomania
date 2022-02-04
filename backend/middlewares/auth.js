const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ') [1];
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
        const userId = decodedToken.userId;
        const userAdmin = decodedToken.isAdmin;
        console.log(token, decodedToken, userId);
        if (req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable !' ;
        }
        else {
            req.userAuth = {id: userId, admin: userAdmin},
            next();
        }
    }
    catch (error) {
        res.status(401).json({'error':'Requête non authentifiée!'});
    }
};
