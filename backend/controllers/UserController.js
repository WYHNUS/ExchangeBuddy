var models = require('../models');
var User = models.User;
var University = models.University;
var Exchange = models.Exchange;

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
    models.sequelize.Promise.all([
        User.create({
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            fbUserId: req.body.facebookToken,
            isEmailVerified: 0
        }),
        University.findOne({
            where: {
                id: req.body.homeUniversity.id
            }
        }),
        Exchange.findOne({
            where: {
                year: req.body.exchangeYear,
                term: req.body.exchangeSem,
                UniversityId: req.body.exchangeUniversity.id
            }
        })
    ])
    .spread(function(user, homeUniversity, exchange){
        if(!!user && !!homeUniversity && !!exchange){
            user.setUniversity(homeUniversity);
            user.addExchangeEvent(exchange);
            res.status(200).send({
                success: true
            });
        }

    });
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
