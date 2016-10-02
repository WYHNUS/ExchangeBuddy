var models = require('../models');

exports.getUniversities = function(req, res){
    models.University.findAll().then(function(universities){
        var result = {};
        for(var i = 0; i < universities.length; i++){
            result[i] = universities[i];
        }
        res.send(JSON.stringify(result));
    });
}
