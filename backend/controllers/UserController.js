var models = require('../models');
var User = models.User;
var Deck = models.Deck;
var Card = models.Card;

// Show a specific user
exports.getUser = function(req, res) {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'email', 'displayName', 'profilePictureUrl', 'bio']
    }).then(function(user) {
        res.json(user);
    }).catch(function(err) {
        resError(res, err);
    });
};

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
