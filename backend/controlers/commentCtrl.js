const models = require('../models');

module.exports = {
    commentPost: async function(req, res){
        try{
            console.log("comment post")
            const content = req.body.content;
            const user = req.userAuth.id;
            const post = req.body.postId;

            await models.comment.create({
                content: content,
                userId: user,
                postId: post
            })
            return res.status(200).json({'message': "comment posts "})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    },
    getAllComments: async function(req, res){
        try{
            console.log("getComments");
            const comments = await models.comment.findAll();
            console.log("All comments:", JSON.stringify(comments));
            return res.status(200).json({'comments': comments})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }
}