const models = require('../models');
const fs = require('fs');



module.exports = {
    //****PUBLISH****/
    publishPost: async function (req, res){
        //params
        try {
            const title = req.body.title;
            const content = req.body.content;
            const userId = req.userAuth.id;
            const userName = req.userAuth.userName;

            console.log(userName);
            let attachement;
            if(req.file){
               attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
        
            await models.post.create({
                title: title,
                content: content,
                userId: userId,
                username: userName,
                attachement: attachement
            })
            return res.status(200).json({'message': "message envoyé"})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    },
    getAllPosts: async function(req, res){
        try{
            const post = await models.post.findAll({
                order: [
                    ['createdAt', 'DESC'], 
                ]
            })
            return res.status(200).json({'posts': post})
        }
        catch(err){
            return res.status(500).json({'error': `${err}`})
        }
    },
    updatePost: async function(req,res){
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        const postId = req.body.postId;
        const content = req.body.content
        let attachement
        if(req.file){
            attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
        if(userId) {
            try {
                await models.post.update(
                    {
                        content: content,
                        attachement: attachement
                    },
                    {where: {id: postId, userId: userId}
                })
                res.status(201).json({'message': 'post updated'});
            
            }
            catch(err){
                res.status(500).json({ 'error': `${err}`});

            };
        }
    },
    deletePost: async function(req,res){
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        const admin = req.userAuth.admin;
        const postId = req.params.id;

        console.log("del comment")
        if(userId || admin) {
            try {
                await models.post.destroy({
                    where: {
                        userId: userId,
                        id: postId
                    }
                })
                res.status(201).json({'post': 'post deleted'});
            
            }
            catch(err){
                res.status(500).json({ 'error': `${err}`});

            };
        }
    }
}