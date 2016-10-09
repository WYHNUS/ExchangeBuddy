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

        // If user exists, login.
        // Else, create a login as new user.
        User.findOrCreate({
            where: {
                fbUserId: response.id,
                email: response.email
            },
            defaults: {
                name: response.name,
                gender: req.body.gender,
                UniversityId: req.body.homeUniversity.id,
            }
        }).spread(function (user, created) {
            if (created) {
                var payload = req.body;
                /*
                    Add default three type of groups have unique name:
                    0: exchange university name + " exchange students -- Year " + year + " " + semester
                    1: home university name + " going abroad -- Year  " + year + " " + semester
                    2: home university name + " students in " + exchange university name
                */
                /*
                    Note: it MIGHT be better to retrieve uni name based on id for security reasons
                */
                var defaultGroups = [
                    {
                        id: 0,
                        name: payload.exchangeUniversity.name + " exchange students -- Year " + payload.exchangeYear + " " + payload.exchangeSem
                    },
                    {
                        id: 1,
                        name: payload.homeUniversity.name + " going abroad -- Year  " + payload.exchangeYear + " " + payload.exchangeSem
                    },
                    {
                        id: 2,
                        name: payload.homeUniversity.name + " students in " + payload.exchangeUniversity.name
                    }
                ];

                // For new users, add exchange event
                Exchange.create({
                    year: payload.exchangeYear,
                    term: payload.exchangeSem,
                    UniversityId: payload.exchangeUniversity.id,
                    UserId: user.id
                }).then(function(exchange) {
                    return Group.findOrCreate({
                        where: {
                            name: defaultGroups[0].name,
                            groupType: defaultGroups[0].id,
                        }
                    })
                }).spread(function(group) {
                    group.addUser(user);
                    return Group.findOrCreate({
                        where: {
                            name: defaultGroups[1].name,
                            groupType: defaultGroups[1].id,
                        }
                    })
                }).spread(function(group) {
                    group.addUser(user);
                    return Group.findOrCreate({
                        where: {
                            name: defaultGroups[2].name,
                            groupType: defaultGroups[2].id,
                        }
                    })
                }).spread(function(group) {
                    group.addUser(user);
                    res.json(user.generateJwt());
                }).catch(function(err) {
                    res.status(500).json({
                        message: err.message
                    });
                });

                /*
                    Don't understand why promise chain doesn't work on method findOrCreate, have to use method above
                */
                // Exchange.create({
                //     year: payload.exchangeYear,
                //     term: payload.exchangeSem,
                //     UniversityId: payload.exchangeUniversity.id,
                //     UserId: user.id
                // }).then (function(exchange) {
                //     var defaultGroupArray = defaultGroups.map(group => {
                //         return Group.findOrCreate({
                //             where: {
                //                 name: group.name,
                //                 groupType: group.id,
                //             }
                //         });
                //     });
                //     Promise.all(defaultGroupArray).spread((responses) => {
                //         // console.log(Group.Instance.prototype);
                //         responses.map(group => {
                //             group.addUser(user);
                //         });
                //         res.json(user.generateJwt());
                //     })
                // }).catch(function(err) {
                //     res.status(500).json({
                //         message: err.message
                //     });
                // });
            } else {
                res.json(user.generateJwt());
            }
        }).catch(function(err) {
            return res.status(500).json({
                message: err.message
            });
        });
    });
};
