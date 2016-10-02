var models = require('../models');

exports.getAllCountries = function(req, res){
    models.Country.findAll().then(function(countries){
        var result = {};
        for(var i = 0; i < countries.length; i++){
            result[i] = countries[i];
        }
        res.send(JSON.stringify(result));
    });
}

exports.getCountry = function(req, res){
    models.Country.findOne({
        where: {
            alpha2Code: req.params.id
        }
    }).then(function(country){
        res.send(JSON.stringify(country));
    })
}
