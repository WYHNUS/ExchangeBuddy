var models = require('../models');

exports.getAllCountries = function(req, res){
    models.Country.findAll({
        attributes: ['name', 'region', 'capital', 'timezones', 'callingCodes']
    }).then(function(countries){
        res.json(countries);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.getCountry = function(req, res){
    models.Country.findOne({
        where: {
            alpha2Code: req.params.id
        }
    }).then(function(country){
        res.json(country);
    }).catch(function(err) {
        resError(res, err);
    });
};

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
