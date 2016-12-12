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

exports.getAllUniversitiesForCountry = function(req, res){
    models.University.findAll({
        where: { countryCode: req.params.alpha2Code },
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

exports.updateUniInfo = function(req, res){
    var query = req.body;

    models.University.update(query, {
        where: {
            id: req.params.id,
        }
    }).then(function(user){
        res.send({
            status: 'success'
        }, function(err){
            res.send({
                status: 'fail',
                err,
            })
        })
    })
}

exports.updateUniLogo = function(req, res){

}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
