var models = require("../models");
var reactions = require('../config/config').reactions;

exports.createFeedPost = function(req, res){
    if(!!req.body.content && !!req.params.id){
        models.FeedPost.create({
            authorId: req.user.id,
            content: req.body.content,
            GroupId: req.params.id,
        }).then(function(feedpost){
            res.status(200).send({
                status: 'success',
                message: 'Feedpost created',
            })
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing content or GroupId'
        })
    }
}

exports.getFeedPostComments = function(req, res){
    if(!!req.params.id){
        models.FeedPostComment.findAll({
            where: {
                FeedPostId: req.params.id
            },
            attributes: ['id', 'content', 'createdAt', 'updatedAt'],
            order: [
                ['createdAt', 'ASC'],
            ],
            include: [
                {
                    model: models.FeedPostCommentReply,
                    attributes: ['id', 'content', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: models.User,
                            as: 'author',
                            attributes: ['id', 'name', 'profilePictureUrl'],
                        }
                    ]
                },
                {
                    model: models.User,
                    as: 'author',
                    attributes: ['id', 'name', 'profilePictureUrl'],
                },
                {
                    model: models.FeedPostCommentReaction,
                    attributes: ['id', 'reaction', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: models.User,
                            attributes: ['id', 'name', 'profilePictureUrl'],
                        }
                    ]
                }
            ]
        }).then(function(comments){
            if(!!comments){
                res.status(200).send({
                    status: 'success',
                    data: comments
                })
            }else{
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid feedpost id',
                })
            }
        })
    }else{
        res.send(400).send({
            status: 'fail',
            message: 'missing feedpost id',
        })
    }
}

exports.getFeedPostByGroup = function(req, res){
    if(!!req.params.id){
        models.FeedPost.findAll({
            where: {
                GroupId: req.params.id,
            },
            attributes: ['id', 'content', 'createdAt', 'updatedAt'],
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: models.User,
                    as: 'author',
                    attributes: ['id', 'name', 'profilePictureUrl'],
                    include: [{
                        model: models.University
                    }]
                },

            ]
        }).then(function(feedposts){
            models.sequelize.Promise.all(
                feedposts.map(feedpost => feedpost.countFeedPostComments())
            ).then(function(feedpostCommentCounts){
                for(var i = 0; i < feedposts.length; i++){
                    feedposts[i].setDataValue('comments', {
                        totalCount: feedpostCommentCounts[i]
                    });
                }
                models.sequelize.Promise.all(
                    feedposts.map(feedpost => feedpost.getFeedPostReactions())
                ).then(function(feedpostsReactions){
                    var allReactions = [];
                    for(var feedpostReactions of feedpostsReactions){
                        var reactions = [];
                        for(var feedpostReaction of feedpostReactions){
                            var found = false;
                            for(var reaction of reactions){
                                if(reaction.emoji == feedpostReaction.reaction){
                                    found = true;
                                    reaction.totalCount = reaction.totalCount + 1;
                                }
                            }
                            if(!found){
                                var reaction = {
                                    emoji: feedpostReaction.reaction,
                                    totalCount: 1,
                                }
                                reactions.push(reaction);
                            }
                        }
                        allReactions.push(reactions);
                    }

                    for(var j = 0; j < feedposts.length; j++){
                        feedposts[j].setDataValue('reactions', allReactions[j]);
                    }

                    res.status(200).send({
                        status: 'success',
                        data: feedposts,
                    })
                })
            })
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing GroupId',
        })
    }
}

exports.getFeedPostByGroupWithComment = function(req, res){
    if(!!req.params.id){
        models.FeedPost.findAll({
            where: {
                GroupId: req.params.id,
            },
            attributes: ['id', 'content'],
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: models.User,
                    as: 'author',
                    attributes: ['id', 'name', 'profilePictureUrl'],
                    include: [{
                        model: models.University
                    }]
                },
                {
                    model: models.FeedPostComment,
                    attributes: ['id', 'content'],
                    include: [
                        {
                            model: models.FeedPostCommentReply,
                            attributes: ['id', 'content'],
                            include: [
                                {
                                    model: models.User,
                                    as: 'author',
                                    attributes: ['id', 'name', 'profilePictureUrl'],
                                }
                            ]
                        },
                        {
                            model: models.User,
                            as: 'author',
                            attributes: ['id', 'name', 'profilePictureUrl'],
                        },
                        {
                            model: models.FeedPostCommentReaction,
                            attributes: ['id', 'reaction'],
                            include: [
                                {
                                    model: models.User,
                                    attributes: ['id', 'name', 'profilePictureUrl'],
                                }
                            ]
                        }
                    ]
                },
                {
                    model: models.FeedPostReaction,
                    attributes: ['id', 'reaction'],
                    include: [
                        {
                            model: models.User,
                            attributes: ['id', 'name', 'profilePictureUrl'],
                        }
                    ]
                }
            ]
        }).then(function(feedposts){
            res.status(200).send({
                status: 'success',
                data: feedposts,
            })
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing GroupId',
        })
    }
}

exports.deleteFeedPost = function(req, res){
    if(!!req.params.id){
        models.FeedPost.destroy({
            where: {
                id: req.params.id,
            }
        }).then(function(count){
            if(count < 1){
                res.status(400).send({
                    status: 'fail',
                    message: 'no entry associated with given FeedPostId'
                })
            }else{
                res.status(200).send({
                    status: 'success',
                    message: 'instance deleted',
                })
            }
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing FeedPostId',
        })
    }
}

exports.updateFeedPost = function(req, res){
    if(!!req.params.id && !!req.body.content){
        models.FeedPost.update({
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(result){
            var count = result[0];
            if(count < 1){
                res.status(400).send({
                    status: 'fail',
                    message: 'no entry associated with given FeedPostId'
                })
            }else{
                res.status(200).send({
                    status: 'success',
                    message: 'instance updated',
                })
            }
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing content or FeedPostId',
        })
    }
}

exports.reactToFeedPost = function(req, res){
    if(!!req.params.id && !!req.body.reaction){
        models.FeedPostReaction.findOne({
            where: {
                FeedPostId: req.params.id,
                UserId: req.user.id,
            }
        }).then(function(reaction){
            if(!!reaction){
                res.status(400).send({
                    status: 'fail',
                    message: 'user already reacted to the feedpost'
                })
            }else {
                if(reactions[0].indexOf(req.body.reaction) != -1){
                    models.FeedPostReaction.create({
                        reaction: req.body.reaction,
                        FeedPostId: req.params.id,
                        UserId: req.user.id,
                    }).then(function(feedpostreaction){
                        if(!!feedpostreaction){
                            res.status(200).send({
                                status: 'success',
                            })
                        }else{
                            res.status(500).send({
                                status: 'fail',
                                message: 'fails to create reaction',
                            })
                        }
                    })
                }else{
                    res.status(400).send({
                        status: 'fail',
                        message: 'unsupported reaction',
                    })
                }
            }
        })

    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing FeedPostId or reaction',
        })
    }
}

exports.unreactToFeedPost = function(req, res){
    if(!!req.params.id){
        models.FeedPostReaction.findOne({
            where: {
                FeedPostId: req.params.id,
                UserId: req.user.id,
            }
        }).then(function(reaction){
            if(!!reaction){
                if(reaction.UserId == req.user.id){
                    reaction.destroy().then(function(){
                        res.status(200).send({
                            status: 'success'
                        })
                    })
                }else{
                    res.status(401).send({
                        status: 'fail',
                        message: 'reaction does not belong to user',
                    })
                }
            }else{
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid reaction id',
                })
            }
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing feed post id',
        })
    }
}
