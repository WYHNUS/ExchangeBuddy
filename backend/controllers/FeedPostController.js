var models = require("../models");

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

exports.getFeedPostByGroup = function(req, res){
    if(!!req.body.GroupId){
        models.FeedPost.findAll({
            where: {
                GroupId: req.body.GroupId,
            },
            attributes: ['id', 'content'],
            include: [
                {
                    model: models.User,
                    attributes: ['id', 'name', 'profilePictureUrl']
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
                                    attributes: ['id', 'name', 'profilePictureUrl'],
                                }
                            ]
                        },
                        {
                            model: models.User,
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
                feedposts,
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

}

exports.unreactToFeedPost = function(req, res){

}
