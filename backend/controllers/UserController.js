var models = require('../models');
var User = models.User;
var University = models.University;
var Exchange = models.Exchange;
var Group = models.Group;

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

exports.createUser = function(req, res) {
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
        })
    ]).spread(function(homeUniversity, exchangeUniversity) {
        if (!!homeUniversity && !!exchangeUniversity) {
            models.sequelize.Promise.all([
                User.create({
                    email: req.body.email,
                    name: req.body.name,
                    gender: req.body.gender,
                    fbUserId: req.body.facebookToken,
                    isEmailVerified: 0, // default to false
                    UniversityId: req.body.homeUniversity.id
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


                /*
                    You are about to see a very bad way of writing code... 
                    Worse than callback hell...
                    But the code below doesn't work -- group is not a Group instance...
                    Will improve after a better strategy is discovered...

                    >>>>>>>>>> Ideal solution (not working) <<<<<<<<<<<
                    
                    var defaultGroupArray = defaultGroups.map(group => {
                        return Group.findOrCreate({
                            where: {
                                name: group.name,
                                groupType: group.id,
                            }
                        });
                    });
                    Promise.all(defaultGroupArray).spread((responses) => {
                        // console.log(Group.Instance.prototype);
                        responses.map(group => {
                            group.addUser(user);
                        });
                        res.json(user.generateJwt());
                    })
                */

                Group.findOrCreate({
                    where: {
                        name: defaultGroups[0].name,
                        groupType: defaultGroups[0].id,
                    }
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

                    // should sent a confirmation email here
                    res.status(200)
                        .json({
                            message: 'Callback Hell reaches to the end.'
                        });

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
