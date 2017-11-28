var models = require('../models');

exports.createReply = function (req, res) {
    if (!!req.params.id && !!req.body.content) {
        models.FeedPostCommentReply.create({
            content: req.body.content,
            FeedPostCommentId: req.params.id,
            authorId: req.user.id,
        }).then(function (reply) {
            if (!!reply) {
                res.status(200).send({
                    status: 'success',
                    message: 'reply created',
                })
            } else {
                res.status(500).send({
                    status: 'fail',
                    message: 'unknown error occured',
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing CommentId or content',
        })
    }
}

exports.deleteReply = function (req, res) {
    if (!!req.params.id) {
        models.FeedPostCommentReply.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function (reply) {
            if (!!reply) {
                if (reply.authorId == req.user.id) {
                    reply.destroy().then(function () {
                        res.status(200).send({
                            status: 'success',
                            message: 'reply deleted',
                        })
                    })
                } else {
                    res.status(401).send({
                        status: 'fail',
                        message: 'unauthorized'
                    })
                }
            } else {
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid ReplyId'
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing ReplyId',
        })
    }
}

exports.updateReply = function (req, res) {
    if (!!req.params.id && !!req.body.content) {
        models.FeedPostCommentReply.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function (reply) {
            if (!!reply) {
                if (reply.authorId == req.user.id) {
                    reply.update({
                        content: req.body.content
                    }).then(function () {
                        res.status(200).send({
                            status: 'successs',
                            message: 'reply updated',
                        })
                    })
                } else {
                    res.status(401).send({
                        status: 'fail',
                        message: 'unauthorized'
                    })
                }
            } else {
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid ReplyId'
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing ReplyId or content',
        })
    }
}
