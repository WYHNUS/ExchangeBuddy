var fs = require('fs');
var xml2js = require("xml2js");
var models = ('./models');
var app = ('./app');

var parser = new xml2js.Parser();

var dummy = {
    name: "ExchangeBuddy"
}

models.User.create(dummy).then(function(user){

    fs.readFile('./exchangebuddy.wordpress.2016-11-03.xml', function(err, data){
        parser.parseString(data, function(err, result){
            for(var item of result.rss.channel[0].item){
                var title = item.title;
                var content = item['content:encoded'][0]
                models.Story.create({
                    title,
                    content,
                    id: user.id
                })
            }
        })
    })

})
