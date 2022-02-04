const models = require('../models');

module.exports= {
    //*****GET PROFILE *****//
    getProfile: function(req,res){
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        const auth = req.userAuth;
        console.log("verification du auth", auth);

        models.user.findOne({
            attributes: ['id', 'email', 'username'],
            where: {id: userId}
        })
        .then(function(user){
            if(user) {
                res.status(201).json(user);
            }
            else {
                res.status(404).json({ 'error': 'user not found'});

            }    
        })
        .catch(function(err){
            res.status(500).json({ 'error': 'cannot fetch user'});

        });
    },
    //*****DELETE PROFILE *****//
    deleteProfile: async function(req,res){
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        if(userId) {
            try {
                await models.user.destroy({
                    where: {id: userId}
                })
                res.status(201).json({'user': 'user deleted'});
            
            }
            catch(err){
                res.status(500).json({ 'error': `${err}`});

            };
        }
    }
}