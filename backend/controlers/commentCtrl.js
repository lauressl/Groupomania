const models = require('../models');

module.exports = {
    commentPost: async function(req, res){
        try{
            console.log("comment post")
            const content = req.body.content;
            const user = req.userAuth.id;
            const post = req.body.post_id;

            await models.comment.create({
                content: content,
                user_id: user,
                post_id: post
            })
            return res.status(200).json({'message': "comment posts "})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }
}