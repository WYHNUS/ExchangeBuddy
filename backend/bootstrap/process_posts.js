var fs = require('fs');
var xml2js = require("xml2js");
var app = require('../app');
var models = require('../models');


var parser = new xml2js.Parser();

var dummy = {
    name: "ExchangeBuddy"
}

models.User.create(dummy).then(function(user){

    fs.readFile('./exchangebuddy.wordpress.2016-11-03.xml', function(err, data){
        parser.parseString(data, function(err, result){
            for(var item of result.rss.channel[0].item){
                var title = item.title[0];
                var lines = item['content:encoded'][0].split('\n');

                var content = '';
                for (var i=0; i<lines.length; i++) {
                    if (!!lines[i].trim()) {
                        content = '<p>' + lines[i] + '</p>';
                    }
                }

                models.Story.create({
                    title,
                    content,
                    UserId: user.id
                })
            }
        })
    })

})
