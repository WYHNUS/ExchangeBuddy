var models = require('../models');

exports.getAllUniversities = function(req, res){
    models.University.findAll({
    	attributes: ['id', 'name', 'city', 'logoImageId', 'emailDomains', 'terms']
    }).then(function(universities){
        res.json(universities);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUniversity = function(req, res) {
    models.University.create({
        name: req.body.name
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

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
