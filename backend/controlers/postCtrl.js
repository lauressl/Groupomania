const models = require('../models');


module.exports = {
    //****PUBLISH****/
    publishPost: async function (req, res){
        //params
        try {
            console.log("coucou");
            const title = req.body.title;
            const content = req.body.content;
            const user = req.userAuth.id;

            await models.post.create({
                title: title,
                content: content,
                user_id: user,
                likes:0
            })
            return res.status(200).json({'message': "message envoyé"})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }
}