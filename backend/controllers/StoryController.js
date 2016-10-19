var models = require('../models');

// user create story
exports.createStory = function(req, res) {
    if (!req.body.userId) {
        res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }
    var isStoryPublic = true;
    if (!!req.body.isPublic) {
        isStoryPublic = req.body.isPublic;
    }
    models.Story.create({
        content: req.body.storyContent,
        isPublic: isStoryPublic,
        UserId: req.body.userId
    }).then(function(story) {
        res.json(story);
    }).catch(function(err) {
        resError(res, err);
    });
}

// get story with specified story id
exports.getStory = function(req, res) {
    models.Story.findOne({
        where: {
            id: req.body.storyId
        },
        include: [{
            model: models.User,
            attributes: ['id']
        }]
    }).then(function(story){
        if (!!story) {
            if (!story.isPublic && story.UserId === req.body.userId) {
                res.json(story);
            } else {
                res.status(401)
                    .json({
                        status: 'fail',
                        message: 'Sorry, you are not allowed to view this story. :o'
                    });
            }
        } else {
            res.status(404)
                .json({
                    status: 'fail',
                    message: 'Story not found.'
                });
        }
    }).catch(function(err) {
        resError(res, err);
    });
}

// get all public stories id belongs to all people
exports.getAllStories = function(req, res){
    models.Story.findAll({
        where: {
            isPublic: true
        }
    }).then(function(stories){
        res.json(stories);
    }).catch(function(err) {
        resError(res, err);
    });
};

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
