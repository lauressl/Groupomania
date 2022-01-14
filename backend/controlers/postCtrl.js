const models = require('../models');
const postCtrl = require('../controlers/postCtrl');


module.exports = {
    //****PUBLISH****/
    publishPost: function (req, res){
        //params
        const postId = req.body.id;
        const title = req.body.title;
        const content = req.body.content;
        const attachement = req.body.attachement;
        const user_id = req.userAuth.id;
        const likes = req.body.likes;

        if(title && content && attachement && user_id ) {
            const newPost = models.post.create({
                title: title,
                content: content,
                attachement: attachement,
                user_id: user_id,
                likes: 0
            })
        }
        else {
            return res.status(200).json({'error': 'missing params'})
        }
    }
}