var models = require('../models');

exports.createAnswer = function (req, res) {
    if(!!req.params.id && !!req.body.content){
        models.Question.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(question){
            if(!!question){
                models.Answer.create({
                    content: req.body.content,
                    authorId: req.user.id,
                    QuestionId: req.params.id,
                }).then(function(answer){
                    if(!!answer){
                        res.status(200).send({
                            status: 'success',
                            messsage: 'answer created',
                        })
                    } else {
                        res.status(400).send({
                            status: 'fail',
                            message: 'db error',
                        })
                    }
                })
            } else {
                res.status(400).send({
                    status: 'fail',
                    message: 'invalid QuestionId'
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing QuestionId or content'
        });
    }
};

exports.updateAnswer = function (req, res) {
    if(!!req.body.content && !!req.params.id){
        models.Answer.findOne({
            where: {
                id: req.params.id,
                anthorId: req.user.id,
            }
        }).then(function(answer){
            if(!!answer){
                answer.update({
                    content: req.body.content
                }).then(function(answer){
                    res.status(200).send({
                        status: 'success',
                        message: 'answer updated',
                    })
                })
            } else {
                res.status(400).send({
                    status: 'fail',
                    message: 'answer entry not found'
                })
            }
        })
    } else {
        res.status(400).send({
            status: 'fail',
            message: 'missing content or AnswerId',
        })
    }
};

exports.deleteAnswer = function (req, res) {

};

exports.getAnswers = function (req, res) {

};

exports.upvoteAnswer = function (req, res) {

};

exports.downvoteAnswer = function (req, res) {

};
