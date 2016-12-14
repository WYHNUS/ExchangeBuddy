var app = require('../app');
var models = require('../models');
var removeDiacritics = require('diacritics').remove;
var fs = require('fs');

var prefix = "https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/";

models.University.findAll().then(function(unis){
    for(var uni of unis){
        var dbName = uni.name;
        var name = dbName.split('/')[0].trim().toLowerCase()
        .replace(/ /g, '-')
        .replace(')', '')
        .replace('(', '');

        name += '.jpg';
        name = removeDiacritics(name);
        if(fs.existsSync('./University_Logos/'+name)){
            var url = prefix + name;
            uni.update({
                logoImageUrl: url,
            })
        }else{
            uni.update({
                logoImageUrl: null,
            })
        }

    }
})
