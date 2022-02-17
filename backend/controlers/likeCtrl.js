const models = require('../models');

module.exports = {
    /* likePost: async function(req, res){
        try{
            console.log("Like post")
            const user = req.userAuth.id;
            const post = req.body.postId;

            await models.like.create({
                userId: user,
                postId: post
            })
            return res.status(200).json({'message': "like posts "})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }, */
    likePosts: async function(req, res){
        try{
            console.log("Like post")
            const user = req.userAuth.id;
            const post = req.body.postId;

            await models.like.findOne({
                where:{ 
                    userId: user,
                    postId: post 
                }
            })
            .then(function(likeFound){
                if(!likeFound){
                    models.like.create({
                        userId: user,
                        postId: post
                    })
                    return res.status(200).json({'message': "Vous aimez le  posts "})
                }
                else {
                    return res.status(300).json({'message': "Vous avez déjà aimé le post "})
                }
            })
            
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    },
    getAllLike: async function(req, res){
        try{
            console.log("getLikes");
            console.log("req", req.params);
            const likes = await models.like.findAndCountAll({
                where: {postId: req.params.postId}
            });
            console.log("All likes:", JSON.stringify(likes));
            return res.status(200).json({'likes': likes})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }
}