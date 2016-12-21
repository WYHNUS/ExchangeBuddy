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

}

exports.deleteFeedPost = function(req, res){

}

exports.updateFeedPost = function(req, res){

}

exports.reactToFeedPost = function(req, res){

}

exports.unreactToFeedPost = function(req, res){

}
