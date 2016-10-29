var graph = require('fbgraph');
var models = require('../models');
var md5 = require('md5');
var User = models.User;

exports.authenticate = function (req, res) {
    if (!req.body.facebookToken && !req.body.password) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }
    var facebookToken = req.body.facebookToken;
    console.log(facebookToken);
    var verify = function (error, response) {
        if (error) {
            return res.status(400)
                .json({
                    status: 'fail',
                    message: error.message
                });
        }

        var query = (!!response)
        ? {
            where: {
                fbUserId: response.id
            }
        }
        : {
            where: {
                email: req.body.email,
                password: md5(req.body.password)
            }
        };

        // Check if use has their emailAccount verified
        User.findOne(query).then(function (user) {
            if (!user) {
                // 401 means that the user is unknown
                return res.status(401).json({
                    status: 'fail',
                    message: 'User not found.'
                });
            }
            if (user.isEmailVerified) {
                return res.json({
                    status: 'success',
                    user: user,
                    token: user.generateJwt()
                });
            } else {
                // 403 means that the user is known but not authorized
                return res.status(403).json({
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

    };

    if(!!facebookToken){
        graph.get("/me?fields=name,id,gender&access_token=" + facebookToken, verify);
    }else{
        verify(null, null);
    }

};
