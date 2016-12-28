var models = require('../models');

exports.createReply = function(req, res){
    if(!!req.body.CommentId && !!req.body.content){
        models.FeedPostCommentReply.create({
            content: req.body.content,
            FeedPostCommentId: req.body.CommentId,
            authorId: req.user.id,
        }).then(function(reply){
            if(!!reply){
                res.status(200).send({
                    status: 'success',
                    message: 'reply created',
                })
            }else{
                res.status(500).send({
                    status: 'fail',
                    message: 'unknown error occured',
                })
            }
        })
    }else{
        res.status(400).sene({
            status: 'fail',
            message: 'missing CommentId or content',
        })
    }
}

exports.deleteReply = function(req, res){

}

exports.updateReply = function(req, res){

}
