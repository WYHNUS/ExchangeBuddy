var app = require('../app');
var models = require('../models');
var removeDiacritics = require('diacritics').remove;

var prefix = "https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/";

models.University.findAll().then(function(unis){
    for(var uni of unis){
        var dbName = uni.name;
        var name = dbName.split('/')[0].split('(')[0].trim().toLowerCase().replace(/ /g, '-');
        name += '.jpg';
        var url = prefix + name;
        url = removeDiacritics(url);
        uni.update({
            logoImageUrl: url,
        })
    }
})
