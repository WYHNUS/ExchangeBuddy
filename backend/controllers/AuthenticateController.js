var graph = require('fbgraph');
var Promise = require("bluebird");
var q = require('q');
var models = require('../models');
var User = models.User;
var Group = models.Group;
var Exchange = models.Exchange;

exports.authenticate = function (req, res) {
    if (!req.body.facebookToken) {
        return res.status(400)
            .json({
                message: 'Invalid authenticate data.'
            });
    }
    var facebookToken = req.body.facebookToken;
    graph.get("/me?fields=name,id,email&access_token=" + facebookToken, function (error, response) {
        if (error) {
            return res.status(400)
                .json({
                  message: error.message
                });
        }

        // Check if use has their emailAccount verified
        User.findOne({
            where: {
                email: response.email
            }
        }).then(function (user) {
            if (user.isEmailVerified) {
                res.json(user.generateJwt());
            } else {
                return res.status(401).json({
                    message: 'Email account not verified.'
                });
            }
        }).catch(function(err) {
            return res.status(500).json({
                message: err.message
            });
        });
    });
};
