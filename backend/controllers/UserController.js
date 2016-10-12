var helper = require('sendgrid').mail;
var passwordless = require('passwordless');
var models = require('../models');
var User = models.User;
var University = models.University;
var Exchange = models.Exchange;
var Group = models.Group;
var MailCtrl = require('./MailController');
var uid = require('rand-token').uid;

// Show a specific user
exports.getUser = function(req, res) {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'email', 'name', 'profilePictureUrl', 'bio']
    }).then(function(user) {
        res.json(user);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUser = function(req, res){
    var token = uid(32);
    models.sequelize.Promise.all([
        University.findOne({
            where: {
                id: req.body.homeUniversity.id
            }
        }),
        University.findOne({
            where: {
                id: req.body.exchangeUniversity.id
            }
        }),
        User.findOne({
            where: {
                email: req.body.email
            }
        })
    ]).spread(function(homeUniversity, exchangeUniversity, existingUser) {
        if (!!existingUser) {
            return res.status(500).json({
                    message: "Email account already registered!"
                });
        }
        if (!!homeUniversity && !!exchangeUniversity) {
            models.sequelize.Promise.all([
                User.create({
                    email: req.body.email,
                    name: req.body.name,
                    gender: req.body.gender,
                    fbUserId: req.body.facebookToken,
                    isEmailVerified: 0, // default to false
                    UniversityId: req.body.homeUniversity.id,
                    verificationToken: token
                }),
                Exchange.create({
                    year: req.body.exchangeYear,
                    term: req.body.exchangeSem,
                    UniversityId: req.body.exchangeUniversity.id
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
                        name: homeUniversity.name + " going abroad -- Year  " + exchange.year + " " + exchange.term
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
                    MailCtrl.sendVerificationEmail(user);
                    res.json(user.generateJwt());
                });

            }).catch(function(err){
                resError(res, err);
            });
        } else {
            res.status(400)
                .json({
                    message: 'Invalid University Id.'
                });
        }
    }).catch(function(err){
        resError(res, err);
    });
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
