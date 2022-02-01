const models = require('../models');
const fs = require('fs');



module.exports = {
    //****PUBLISH****/
    publishPost: async function (req, res){
        //params
        try {
            console.log("coucou");
            const title = req.body.title;
            const content = req.body.content;
            const user = req.userAuth.id;
            console.log("image", req.file);

            await models.post.create({
                title: title,
                content: content,
                user_id: user,
                attachement: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                likes:0
            })
            return res.status(200).json({'message': "message envoyé"})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    },
    getAllPosts: async function(req, res){
        try{
            console.log("getPost");
            const post = await models.post.findAll();
            console.log("All posts:", JSON.stringify(post));
            return res.status(200).json({'title': 'posts trouvés'})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }
}