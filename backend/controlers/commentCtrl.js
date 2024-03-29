const models = require('../models');

module.exports = {
    commentPost: async function (req, res) {
        try {
            console.log("comment post")
            const content = req.body.content;
            const user = req.userAuth.id;
            const post = req.body.postId;

            await models.comment.create({
                content: content,
                userId: user,
                postId: post
            })
            return res.status(200).json({ 'message': "comment posts " })
        }
        catch (err) {
            return res.status(500).json({ 'error': `${err}` })
        }
    },
    getAllComments: async function (req, res) {
        try {
            const comments = await models.comment.findAndCountAll({
                where: { postId: req.params.postId }
            });
            return res.status(200).json({ 'comments': comments })
        }
        catch (err) {
            return res.status(500).json({ 'error': `${err}` })
        }
    },

    deleteComment: async function (req, res) {
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        const admin = req.userAuth.admin;
        const id = req.body.id;

        console.log("del comment")
        if (userId || admin) {
            try {
                await models.comment.destroy({
                    where: {
                        id: id
                    }
                })
                res.status(201).json({ 'comment': 'comment deleted' });

            }
            catch (err) {
                res.status(500).json({ 'error': `${err}` });

            };
        }
    }
}