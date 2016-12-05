var graph = require('fbgraph');
var models = require('../models');
var md5 = require('md5');
var User = models.User;

exports.authenticateOrCreateByFB = function(req, res){
    if(!req.body.facebookToken){
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }else{
        var facebookToken = req.body.facebookToken;
        graph.get("/me?fields=name,id,email,picture.width(720).height(720)&access_token=" + facebookToken, function(error, response){
            User.findOne({
                where: {
                    fbUserId: response.id
                }
            }).then(function(existingUser){
                if(!!existingUser){
                    return res.status(200).json({
                            status: 'success',
                            user: existingUser,
                            token: existingUser.generateJwt()
                        });
                }else{
                    User.create({
                        fbUserId: response.id,
                        email: response.email,
                        name: response.name,
                        profilePictureUrl: response.picture.data.url,
                        isEmailVerified: 1
                    }).then(function(user){
                        res.status(200).json({
                            status: 'success',
                            user: user,
                            token: user.generateJwt()
                        })
                    })
                }
            }).catch(function(err){
                console.log('error HERE: ', err);
                resError(res, err);
            });
        });
    }
}

exports.authenticateByEmail = function (req, res) {
    if (!req.body.password || !req.body.email) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }

    User.findOne({
        where: {
            email: req.body.email,
            password: md5(req.body.password)
        }
    }).then(function(user){
        if (!user) {
            // 401 means that the user is unknown
            return res.status(401).json({
                status: 'fail',
                message: 'Email or password is invalid.'
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
                message: 'Email account not verified.',
                user: user
            });
        }
    }).catch(function(err){
        console.log('error HERE: ', err);
        resError(res, err);
    });
};


function resError(res, err) {
    return res.status(500).json({
        status: 'fail',
        message: err.message
    });
}