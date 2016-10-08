var graph = require('fbgraph');
var models = require('../models');
var User = models.User;
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
                homeUniversityId: req.body.homeUniversity.id,
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
                            groupType: group.id
                        }
                    }).then(function(group) {
                        group.addUser(user);
                    });
                });

                // For new users, add exchange event
                asyncArray.push(Exchange.create({
                    year: payload.exchangeYear,
                    term: payload.exchangeSem,
                    exchangeUniversityId: payload.exchangeUniversity.id,
                    userId: user.id
                }));
                    
                Promise.all(asyncArray).then(function() {
                    res.json(user.generateJwt());
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
