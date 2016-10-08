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
                fbUserId: response.id
            },
            defaults: {
                name: response.name,
                email: response.email,
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
                var asyncArray = defaultGroups.map(group => {
                    return Group.findOrCreate({
                        where: {
                            name: group.name,
                            groupType: group.id,
                        }
                    });
                });

                // For new users, add exchange event
                var deferred = q.defer();
                Exchange.create({
                    year: payload.exchangeYear,
                    term: payload.exchangeSem,
                    UniversityId: payload.exchangeUniversity.id,
                    UserId: user.id
                }).then (function(exchange) {
                    deferred.resolve(exchange);
                });
                asyncArray.push(deferred.promise);
                    
                Promise.all(asyncArray).spread((responses) => {
                    console.log(responses[0]);
                    /*
                        error : addUser is not a function
                    */
                    for (var i=0; i<3; i++) {
                        responses[i].addUser(user);
                    }
                    res.json(user.generateJwt());
                }).catch(function(err) {
                    res.status(500).json({
                        message: err.message
                    });
                });
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
