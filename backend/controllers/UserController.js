var helper = require('sendgrid').mail;
var graph = require('fbgraph');
var md5 = require('md5');

var models = require('../models');
var User = models.User;
var University = models.University;
var Exchange = models.Exchange;
var Group = models.Group;
var MailCtrl = require('./MailController');

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
            user.setDataValue("Exchanges", exchanges);
            res.json(user);
        })

    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUser = function(req, res){
    if (!req.body.facebookToken && !req.body.password) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }
    var facebookToken = req.body.facebookToken;

    models.sequelize.Promise.all([
        University.findOne({
            where: {
                name: req.body.homeUniversity
            }
        }),
        University.findOne({
            where: {
                name: req.body.exchangeUniversity
            }
        }),
        User.findOne({
            where: {
                email: req.body.email
            }
        })
    ]).spread(function(homeUniversity, exchangeUniversity, existingUser) {
        if (!!existingUser) {
            return res.status(409).json({
                    status: 'fail',
                    message: "Email account already registered!"
                });
        }
        else if (!!homeUniversity && !!exchangeUniversity) {
            var create = function (error, response) {
                if (error) {
                    return res.status(400)
                        .json({
                            status: 'fail',
                            message: error.message
                        });
                }

                var profilePictureUrl = (!!response) ? response.picture.data.url : null;
                var fbUserId = (!!response) ? response.id : null;
                var name = (!!response) ? response.name : req.body.name;

                models.sequelize.Promise.all([
                    User.create({
                        email: req.body.email,
                        name: name,
                        gender: req.body.gender,
                        fbUserId: fbUserId,
                        profilePictureUrl: profilePictureUrl,
                        password: md5(req.body.password),
                        isEmailVerified: 0, // default to false
                        UniversityId: homeUniversity.id,
                    }),
                    Exchange.create({
                        year: req.body.exchangeYear,
                        term: req.body.exchangeSem,
                        UniversityId: exchangeUniversity.id
                    })
                ]).spread(function(user, exchange) {
                    user.addExchangeEvent(exchange);
                    /*
                        Add default three type of groups have unique name:
                        0: exchange university name + " exchange students -- Year " + year + " " + semester
                        1: home university name + " going abroad -- Year  " + year + " " + semester
                        2: home university name + " students in " + exchange university name
                    */
                    var defaultGroups = [
                        {
                            id: 0,
                            name: exchangeUniversity.name + " exchange students -- Year " + exchange.year + " " + exchange.term
                        },
                        {
                            id: 1,
                            name: homeUniversity.name + " going abroad -- Year " + exchange.year + " " + exchange.term
                        },
                        {
                            id: 2,
                            name: homeUniversity.name + " students in " + exchangeUniversity.name
                        }
                    ];

                    var defaultGroupArray = defaultGroups.map(group => {
                        return Group.findOrCreate({
                            where: {
                                name: group.name,
                                groupType: group.id,
                            }
                        });
                    });
                    models.sequelize.Promise.all(defaultGroupArray).spread((group1, group2, group3) => {
                        groups = [group1, group2, group3];
                        groups.map(group => {
                            group[0].addUser(user);
                        });

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
                            });
                    });

                }).catch(function(err){
                    resError(res, err);
                });
            };

            if(!!facebookToken){
                graph.get("/me?fields=name,id,email,picture&access_token=" + facebookToken, create);
            }else{
                create(null, null);
            }

        } else {
            res.status(400)
                .json({
                    status: 'fail',
                    message: 'Invalid University Name.'
                });
        }
    }).catch(function(err){
        console.log('error HERE: ', err);
        resError(res, err);
    });
}

exports.updateUser = function(req, res){
    User.update({
        bio: req.body.bio,
        website: req.body.website,
        birthday: new Date(req.body.birthday),
        name: req.body.name
    }, {
        where: {
            id: req.body.userId
        }
    })
}

function resError(res, err) {
    return res.status(500).json({
        status: 'fail',
        message: err.message
    });
}
