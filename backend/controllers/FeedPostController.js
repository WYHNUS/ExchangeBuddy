var models = require("../models");
var reactions = require('../config/config').reactions;

exports.createFeedPost = function(req, res){
    if(!!req.body.content && !!req.body.GroupId){
        models.FeedPost.create({
            authorId: req.user.id,
            content: req.body.content,
            GroupId: req.body.GroupId,
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

exports.getFeedPostComment = function(req, res){
    if(!!req.params.id){
        models.FeedPostComment.findAll({
            where: {
                FeedPostId: req.params.id
            },
            attributes: ['id', 'content', 'createdAt', 'updatedAt'],
            order: [
                ['createdAt', 'DESC'],
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
    if(!!req.body.FeedPostId){
        models.FeedPost.destroy({
            where: {
                id: req.body.FeedPostId,
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
    if(!!req.body.FeedPostId && !!req.body.content){
        models.FeedPost.update({
            content: req.body.content
        }, {
            where: {
                id: req.body.FeedPostId
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
    if(!!req.body.FeedPostId && !!req.body.reaction){
        models.FeedPostReaction.findOne({
            where: {
                FeedPostId: req.body.FeedPostId,
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
                        FeedPostId: req.body.FeedPostId,
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
    if(!!req.body.ReactionId){
        models.FeedPostReaction.findOne({
            where: {
                id: req.body.ReactionId,
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
            message: 'missing ReactionId',
        })
    }
}
