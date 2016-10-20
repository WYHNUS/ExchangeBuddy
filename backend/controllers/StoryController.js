var models = require('../models');

// user create story
exports.createStory = function(req, res) {
    if (!req.body.userId) {
        return res.status(401)
            .json({
                status: 'fail',
                message: 'Please login first.'
            });
    }
    if (!req.body.storyTitle | !req.body.storyContent) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid story data.'
            });
    }
    var isStoryPublic = true;
    if (!!req.body.isPublic) {
        isStoryPublic = req.body.isPublic;
    }
    models.Story.create({
        title: req.body.storyTitle,
        content: req.body.storyContent,
        isPublic: isStoryPublic,
        UserId: req.body.userId
    }).then(function(story) {
        return res.status(200)
            .json({
                status: 'success',
                message: story
            });
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
            attributes: ['id', 'name', 'profilePictureUrl']
        }]
    }).then(function(story){
        if (!!story) {
            if (story.isPublic && story.UserId === req.body.userId) {
                return res.status(200)
                    .json({
                        status: 'success',
                        message: story
                    });
            } else {
                return res.status(401)
                    .json({
                        status: 'fail',
                        message: 'Sorry, you are not allowed to view this story. :o'
                    });
            }
        } else {
            return res.status(404)
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
        },
        attributes: ['id', 'title', 'createdAt'],
        include: [{
            model: models.User,
            attributes: ['id', 'name', 'profilePictureUrl']
        }]
    }).then(function(stories){
        return res.status(200)
            .json({
                status: 'success',
                message: stories
            });
    }).catch(function(err) {
        resError(res, err);
    });
};

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
