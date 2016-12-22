var models = require('../models');

exports.createComment = function(req, res){
    if(!!req.body.content && !!req.body.FeedPostId){
        models.FeedPostComment.create({
            content: req.body.content,
            FeedPostId: req.body.FeedPostId,
            authorId: req.user.id,
        }).then(function(comment){
            if(!!comment){
                res.status(200).send({
                    status: 'success',
                    message: 'comment posted',
                })
            }else{
                res.status(500).send({
                    status: 'fail',
                    message: 'comment unsuccessful',
                })
            }
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing content or FeedPostID',
        })
    }
}

exports.updateComment = function(req, res){
    if(!!req.body.content && !!req.body.FeedPostId){
        models.FeedPostComment.findOne({
            where: {
                id: req.body.FeedPostId,
            }
        }).then(function(comment){
            if(!!comment){
                if(comment.authorId == req.user.id){
                    comment.update({
                        content: req.body.content,
                    }).then(function(comment){
                        res.status(200).send({
                            status: 'success'
                        })
                    })
                }else{
                    res.status(401).send({
                        status: 'fail',
                        message: 'comment does not belong to user',
                    })
                }
            }else{
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid FeedPostId',
                })
            }
        })
    }else{
        res.status(400).send({
            status: 'fail',
            message: 'missing content or FeedPostId'
        })
    }
}

exports.deleteComment = function(req, res){

}

exports.reactToComment = function(req, res){

}

exports.unreactToComment = function(req, res){

}
