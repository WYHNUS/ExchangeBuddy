var app = require('../app');
var imgs = require('./cover_imgs');
var models = require('../models');

models.Story.findAll().then(function(stories){
    stories.map((story) => {
        story.update({
            coverPhoto: imgs[story.title]
        })
    })
})
