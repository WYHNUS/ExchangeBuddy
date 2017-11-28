var app = require('../app');
var models = require('../models');

var prefix = 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-country-flags/';

models.sequelize.Promise.all([
    models.Country.findAll(),
    models.Wiki.findAll({
        where: {
            UniversityId: null
        }
    })
]).spread(function(countries, wikis){
    countries.map(country => {
        country.update({
            logoImage: prefix+country.alpha2Code.toLowerCase()+'.png'
        })
    });

    wikis.map(wiki => {
        wiki.update({
            image: prefix+wiki.CountryAlpha2Code.toLowerCase()+'.png'
        })
    })
});
