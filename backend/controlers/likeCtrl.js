const models = require('../models');

module.exports = {
    likePosts: async function (req, res) {
        try {
            const user = req.userAuth.id;
            const post = req.body.postId;

            await models.like.findOne({
                where: {
                    userId: user,
                    postId: post
                }
            })
                .then(function (likeFound) {
                    if (!likeFound) {
                        models.like.create({
                            userId: user,
                            postId: post
                        })
                        return res.status(200).json({ 'message': "Vous aimez le  posts " })
                    }
                    else {
                        return res.status(300).json({ 'message': "Vous avez déjà aimé le post " })
                    }
                })

        }
        catch (err) {
            return res.status(500).json({ 'error': `${err}` })
        }
    },
    unlikePosts: async function (req, res) {
        try {
            const user = req.userAuth.id;
            const post = req.params.postId;

            await models.like.findOne({
                where: {
                    userId: user,
                    postId: post
                }
            })
                .then(function (likeFound) {
                    if (likeFound) {
                        models.like.destroy({
                            where: {
                                userId: user,
                                postId: post
                            }
                        })
                        return res.status(200).json({ 'message': "Vous unlikez le  posts " })
                    }
                    else {
                        return res.status(300).json({ 'message': "Vous avez déjà unliké le post " })
                    }
                })

        }
        catch (err) {
            return res.status(500).json({ 'error': `${err}` })
        }
    },
    getAllLike: async function (req, res) {
        try {
            const likes = await models.like.findAndCountAll({
                where: { postId: req.params.postId }
            });
            return res.status(200).json({ 'likes': likes })
        }
        catch (err) {
            return res.status(500).json({ 'error': `${err}` })
        }
    }
}