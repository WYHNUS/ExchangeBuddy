var models = require('../models');
var reactions = require('../config/config').reactions;

exports.createComment = function(req, res) {
    if (!!req.body.content && !!req.params.id) {
        models.FeedPostComment.create({
            content: req.body.content,
            FeedPostId: req.params.id,
            authorId: req.user.id,
        }).then(function(comment) {
            if (!!comment) {
                res.status(200).send({
                    status: 'success',
                    message: 'comment posted',
                })
            } else {
                res.status(500).send({
                    status: 'fail',
                    message: 'comment unsuccessful',
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing content or FeedPostID',
        })
    }
}

exports.updateComment = function(req, res) {
    if (!!req.body.content && !!req.params.id) {
        models.FeedPostComment.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function(comment) {
            if (!!comment) {
                if (comment.authorId == req.user.id) {
                    comment.update({
                        content: req.body.content,
                    }).then(function(comment) {
                        res.status(200).send({
                            status: 'success'
                        })
                    })
                } else {
                    res.status(401).send({
                        status: 'fail',
                        message: 'comment does not belong to user',
                    })
                }
            } else {
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid FeedPostId',
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing content or FeedPostId'
        })
    }
}

exports.deleteComment = function(req, res) {
    if (!!req.params.id) {
        models.FeedPostComment.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function(comment) {
            if (!!comment) {
                if (comment.authorId == req.user.id) {
                    comment.destroy().then(function() {
                        res.status(200).send({
                            status: 'success'
                        })
                    })
                } else {
                    res.status(401).send({
                        status: 'fail',
                        message: 'comment does not belong to user',
                    })
                }
            } else {
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid FeedPostId',
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing or FeedPostId'
        })
    }
}

exports.reactToComment = function(req, res) {
    if (!!req.params.id && !!req.body.reaction) {
        if (reactions[0].indexOf(req.body.reaction) != -1) {

            models.FeedPostCommentReaction.findOne({
                where: {
                    FeedPostCommentId: req.params.id,
                    UserId: req.user.id,
                }
            }).then(function(reaction) {
                if (!!reaction) {
                    reaction.update({
                        reaction: req.body.reaction
                    }).then(function(reaction) {
                        res.status(200).send({
                            status: 'success',
                            message: 'updated',
                        })
                    });

                } else {

                    models.FeedPostReaction.create({
                        reaction: req.body.reaction,
                        FeedPostCommentId: req.params.id,
                        UserId: req.user.id,
                    }).then(function(feedPostCommentReaction) {
                        if (!!feedPostCommentReaction) {
                            res.status(200).send({
                                status: 'success',
                            })
                        } else {
                            res.status(500).send({
                                status: 'fail',
                                message: 'fails to create reaction',
                            })
                        }
                    })

                }
            })
        } else {
            res.status(400).send({
                status: 'fail',
                message: 'unsupported reaction',
            })
        }
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing CommentId or reaction',
        })
    }
}

exports.unreactToComment = function(req, res) {
    if (!!req.params.id) {
        models.FeedPostCommentReaction.findOne({
            where: {
                FeedPostId: req.params.id,
                UserId: req.user.id,
            }
        }).then(function(reaction) {
            if (!!reaction) {
                if (reaction.UserId == req.user.id) {
                    reaction.destroy().then(function() {
                        res.status(200).send({
                            status: 'success'
                        })
                    })
                } else {
                    res.status(401).send({
                        status: 'fail',
                        message: 'reaction does not belong to user',
                    })
                }
            } else {
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid reaction id',
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing feed post id',
        })
    }
}
