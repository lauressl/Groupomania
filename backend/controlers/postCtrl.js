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
            let attachement;
            
            if(req.body.attachement){
               attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
        
            await models.post.create({
                title: title,
                content: content,
                userId: user,
                attachement: attachement,
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
            return res.status(200).json({'posts': post})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    }
}