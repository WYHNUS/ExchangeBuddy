var models = require('../models');

exports.getAllUniversities = function(req, res){
    models.University.findAll({
    	attributes: ['id', 'name', 'city', 'logoImageUrl', 'emailDomains', 'terms']
    }).then(function(universities){
        res.json(universities);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUniversity = function(req, res) {
    models.University.create({
        name: req.body.name,
        logoImageUrl: req.body.logoImageUrl,
        emailDomains: JSON.stringify(req.body.emailDomains)
    }).then(function(university) {
        res.json(university);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.getUniversity = function(req, res){
    models.University.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(university){
        res.json(university);
    }).catch(function(err) {
        resError(res, err);
    });
};

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
        })
    }
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
