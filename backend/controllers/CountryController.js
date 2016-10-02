var models = require('../models');

exports.getAllCountries = function(req, res){
    models.Country.findAll().then(function(countries){
        var result = {};
        for(var i = 0; i < countries.length; i++){
            result[i] = countries[i];
        }
        res.send(result);
    });
}
