var graph = require('fbgraph');
var models = require('../models');
var User = models.User;

exports.authenticate = function (req, res) {
    if (!req.body.facebookToken) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }
    var facebookToken = req.body.facebookToken;
    var userEmail = req.body.email;
    graph.get("/me?fields=name,id,email&access_token=" + facebookToken, function (error, response) {
        if (error) {
            return res.status(400)
                .json({
                    status: 'fail',
                    message: error.message
                });
        }

        // Check if use has their emailAccount verified
        User.findOne({
            where: {
                email: userEmail
            }
        }).then(function (user) {
            if (!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found.'
                });
            }
            if (!user.isEmailVerified) {
                return res.json({
                    status: 'success',
                    user: user,
                    token: user.generateJwt()
                });
            } else {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Email account not verified.'
                });
            }
        }).catch(function(err) {
            return res.status(500).json({
                status: 'fail',
                message: err.message
            });
        });
    });
};
