var app = require('../app');
var models = require('../models');
var fs = require('fs');

fs.readFile('./json/country_data.json', function(err, data) {
    var countries = JSON.parse(data);
    for (var i in countries) {
        var country = countries[i];

        models.Country.create({
            alpha2Code: country.alpha2Code,
            name: country.name,
            alpha3Code: country.alpha3Code,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital,
            lat: (country.latlng.length > 0) ? country.latlng[0] : 0,
            lng: (country.latlng.length > 0) ? country.latlng[1] : 0,
            population: country.population,
            currencies: JSON.stringify(country.currencies),
            languages: JSON.stringify(country.languages),
            timezones: JSON.stringify(country.timezones),
            callingCodes: JSON.stringify(country.callingCodes)
        });
    }
});