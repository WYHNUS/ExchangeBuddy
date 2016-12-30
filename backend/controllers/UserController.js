var helper = require('sendgrid').mail;
var graph = require('fbgraph');
var md5 = require('md5');
var AWS = require('aws-sdk');
var config = require('../config/config');
var s3 = require('s3');
var fs = require('fs');

var models = require('../models');
var User = models.User;
var University = models.University;
var Exchange = models.Exchange;
var Group = models.Group;
var MailCtrl = require('./MailController');

var Bucket = "exchangebuddy-profile-pictures";
var s3Options = {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
}


var awsS3Client = new AWS.S3(s3Options);
var options = {
    s3Client: awsS3Client
};
var client = s3.createClient(options);

// Show a specific user
exports.getUser = function(req, res) {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: University
        }],
        attributes: ['id', 'email', 'name', 'profilePictureUrl', 'fbUserId', 'bio', 'UniversityId']
    }).then(function(user) {
        user.getExchangeEvent().then(function(exchanges){
            models.University.findAll({
                where: {
                    id: {
                        $in: exchanges.map(exchange => exchange.UniversityId)
                    }
                }
            }).then(function(universities){
                for(var university of universities){
                    for(var exchange of exchanges){
                        if(exchange.UniversityId == university.id){
                            exchange.setDataValue("University", university);
                        }
                    }
                }
                console.log(exchanges);
                user.setDataValue("Exchanges", exchanges);

                res.json(user);
            })

        })

    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUser = function(req, res){
    if (!req.body.password) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(existingUser) {
        if (!!existingUser) {
            res.status(409)
                .json({
                    status: 'fail',
                    message:'Email account already registered. ' +
                            'Please check your email for account verification. ' +
                            'OR contact ExchangeBuddy admins via admin@exchangebuddy.com'
                });
        } else {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password),
                isEmailVerified: 0
            }).then(function(user){
                MailCtrl.sendVerificationEmail(user)
                .then(function(value) {
                    console.log(value); // Success!
                    res.status(201)
                        .json({
                            status: 'success',
                            message: 'Verification email sent.'
                        });
                }, function(reason) {
                    console.log(reason); // Error!
                    res.status(400)
                        .json({
                            status: 'fail',
                            message: reason
                        });
                })
            })
        }
    }).catch(function(err){
        console.log('error HERE: ', err);
        resError(res, err);
    });
}

exports.updateUser = function(req, res){
    // upload(req, res, function(err){
    //     if(err) console.log(err);
    //     else res.send('ok');
    // });
    var query = {};
    Object.keys(req.body).map((key) => {
        if(req.body[key] != null){
            if(key == "password"){
                query[key] = md5(req.body[key]);
            }else if(key == "birthday"){
                query[key] = new Date(req.body[key]);
            }else{
                query[key] = req.body[key]
            }
        }

    });

    User.update(query, {
        where: {
            id: req.user.id
        }
    }).then(function(user){
        console.log(user);
        res.send({
            status: 'success'
        })
    }, function(err){
        res.send({
            status: 'fail'
        })
    })
}


exports.uploadProfile = function(req, res){
    var params = {
        localFile: req.file.path,
        s3Params: {
            Bucket,
            Key: req.file.filename,
            ACL: 'public-read',
        }
    };

    var uploader = client.uploadFile(params);
    uploader.on('error', function(err){
        console.log(err);
    })

    uploader.on('end', function(){
        var url = s3.getPublicUrl(Bucket, req.file.filename, "ap-southeast-1");
        models.User.findOne({
            where: {
                id: req.user.id
            }
        }).then(function(user){
            if(!!user.profilePictureUrl){

                var splitString = user.profilePictureUrl.split('/');
                var Key = splitString[splitString.length - 1];
                if(Key.length === req.file.filename.length){
                    client.deleteObjects({
                        Bucket,
                        Delete: {
                            Objects: [
                                {
                                    Key,
                                }
                            ]
                        }
                    })
                }

            }
            user.update({
                profilePictureUrl: url
            })

            fs.unlinkSync(req.file.path);
            res.status(200).send({

                url,
                success: true
            });
        })

    })

}


exports.updateUni = function(req, res){
    // hack here -- need to improve: only two possibilities
    var data = req.body;
    if (!data.userId) {
        return res.status(400).json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    } else if (data.homeUniversityId && !data.exchangeUniversityId) {
        // assume this is first time login for now... -> quick hack
        models.sequelize.Promise.all([
            models.User.findOne({
                where: {
                    id: data.userId
                }
            }),
            models.University.findOne({
                where: {
                    id: data.homeUniversityId
                }
            })
        ]).spread(function(user, uni){
            models.sequelize.Promise.all([
                user.getGroup(),
                user.getExchangeEvent(),
                user.setUniversity(uni)
            ]).spread(function(groups, exchange, user){
                user.removeGroup(groups);
                user.removeExchangeEvent(exchange);
                var homeUniversity = uni;
                var defaultGroup = {
                    // todo: ask new user for years they want to exchange, hence make :
                    // check: if req.body.year exists, if exchange event exists,
                    // remember: alter existing db user data
                    // id: 1,
                    // name: homeUniversity.name + " going abroad -- Year " + exchange.year

                    id: 4,
                    name: homeUniversity.name + " interested in exchange"
                }

                console.log(homeUniversity.name);

                models.Group.findOrCreate({
                    where: {
                        name: defaultGroup.name,
                        groupType: defaultGroup.id,
                    }
                }).then(function(group) {
                    console.log(group[0]);
                    group[0].addUser(user);

                    // return user object
                    models.User.findOne({
                        where: {
                            id: user.id
                        },
                        include: [{
                            model: models.University
                        }],
                        attributes: ['id', 'email', 'name', 'profilePictureUrl', 'fbUserId', 'bio', 'UniversityId']
                    }).then(function(currentUser) {
                        return res.status(200).json({
                            status: 'success',
                            user: currentUser
                        });
                    }).catch(function(err) {
                        resError(res, err);
                    });
                }).catch(function(err) {
                    resError(res, err);
                });
            });

        }).catch(function(err){
            resError(res, err);
        });
    } else if (!data.homeUniversityId || !data.exchangeUniversityId || !data.year || !data.term) {
        // check if all fields are present -> quick hack
        return res.status(400).json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    } else if (data.homeUniversityId === data.exchangeUniversityId) {
        // check if homeUni and exchangeUni are the same
        return res.status(400).json({
                status: 'fail',
                message: 'Home uni and exchange uni cannot be the same.'
            });
    } else {
        models.sequelize.Promise.all([
            models.User.findOne({
                where: {
                    id: req.body.userId
                }
            }),

            models.University.findOne({
                where: {
                    id: req.body.exchangeUniversityId
                }
            }),

            models.Exchange.findOrCreate({
                where: {
                    year: req.body.year,
                    term: req.body.term,
                    UniversityId: req.body.exchangeUniversityId
                }
            }),

            models.University.findOne({
                where: {
                    id: req.body.homeUniversityId
                }
            })
        ]).spread(function(user, exchangeUniversity, exchange, university){
            models.sequelize.Promise.all([
                user.getGroup(),
                user.getUniversity(),
                user.getExchangeEvent(),
                user.setUniversity(university)
            ]).spread(function(groups, homeUniversity, exchangeEvent){
                var homeUniversity = university;
                user.removeGroup(groups);
                user.removeExchangeEvent(exchangeEvent);

                exchange = exchange[0];
                user.addExchangeEvent(exchange);

                var defaultGroups = [
                    {
                        id: 0,
                        name: exchangeUniversity.name + " exchange students -- Year " + exchange.year + " " + exchange.term
                    },
                    {
                        id: 1,
                        // todo -> remove exchange.term , this group only consider exchange year
                        name: homeUniversity.name + " going abroad -- Year " + exchange.year
                    },
                    {
                        id: 2,
                        name: homeUniversity.name + " students in " + exchangeUniversity.name
                    }
                ];

                var defaultGroupArray = defaultGroups.map(group => {
                    return models.Group.findOrCreate({
                        where: {
                            name: group.name,
                            groupType: group.id,
                        }
                    });
                });

                models.sequelize.Promise.all(defaultGroupArray).then(groups => {
                    groups.map(group => {
                        group[0].addUser(user);
                    })

                    // return user object
                    models.User.findOne({
                        where: {
                            id: user.id
                        },
                        include: [{
                            model: models.University
                        }],
                        attributes: ['id', 'email', 'name', 'profilePictureUrl', 'fbUserId', 'bio', 'UniversityId']
                    }).then(function(currentUser) {
                        res.send({
                            status: 'success',
                            user: currentUser
                        });
                    }).catch(function(err) {
                        resError(res, err);
                    });
                });
            })
        }).catch(function(err){
            resError(res, err);
        });
    }
}

function resError(res, err) {
    return res.status(500).json({
        status: 'fail',
        message: err.message
    });
}
