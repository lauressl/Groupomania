const models = require('../models');

module.exports = {
    likePost: async function(req, res){
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
    },
    getAllLike: async function(req, res){
        try{
            console.log("getLikes");
            const likes = await models.like.findAll();
            console.log("All likes:", JSON.stringify(likes));
            return res.status(200).json({'likes': likes})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }
}