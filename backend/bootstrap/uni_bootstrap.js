var app = require('../app');
var models = require('../models');
var fs = require('fs');

var removeDiacritics = require('diacritics').remove;
var prefix = "https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/";

fs.readFile('./json/university_data.json', function (err, data) {
    var universities = JSON.parse(data);

    for (var i in universities) {
        var uni = universities[i];

        var logoName = uni.name.split('/')[0].trim().toLowerCase()
            .replace(/ /g, '-')
            .replace(')', '')
            .replace('(', '');
        logoName += '.jpg';
        logoName = removeDiacritics(logoName);

        models.University.create({
            name: uni.name,
            logoImageUrl: (fs.existsSync('./University_Logos/' + logoName)) ? (prefix + logoName) : null,
            website: uni.website,
            emailDomains: JSON.stringify(uni.emailDomains),
            CountryAlpha2Code: uni.countryCode
        });
    }
});
