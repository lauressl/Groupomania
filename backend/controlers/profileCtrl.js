const models = require('../models');

module.exports = {
    //*****GET PROFILE *****//
    getProfile: function (req, res) {
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        const auth = req.userAuth;

        models.user.findOne({
            attributes: ['id', 'email', 'username', 'attachement', 'isAdmin', 'createdAt'],
            where: { id: userId }
        })
            .then(function (user) {
                if (user) {
                    res.status(201).json(user);
                }
                else {
                    res.status(404).json({ 'error': 'user not found' });

                }
            })
            .catch(function (err) {
                res.status(500).json({ 'error': 'cannot fetch user' });

            });
    },
    //*****DELETE PROFILE *****//
    deleteProfile: async function (req, res) {
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        const isAdmin = req.userAuth.admin;
        if (userId || isAdmin) {
            try {
                await models.user.destroy({
                    where: { id: userId }
                })
                res.status(201).json({ 'user': 'user deleted' });

            }
            catch (err) {
                res.status(500).json({ 'error': `${err}` });

            };
        }
    },
    updateProfile: async function (req, res) {
        //params
        //get id from auth middleware and attached it to the request
        const userId = req.userAuth.id;
        let attachement
        if (req.file) {
            attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        if (userId) {
            try {
                await models.user.update(
                    {
                        username: req.body.username,
                        email: req.body.email,
                        attachement: attachement
                    },
                    {
                        where: { id: userId }
                    })
                res.status(201).json({ 'user': 'user updated' });

            }
            catch (err) {
                res.status(500).json({ 'error': `${err}` });

            };
        }
    }
}