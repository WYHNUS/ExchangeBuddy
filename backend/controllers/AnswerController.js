var models = require('../models');

exports.createAnswer = function (req, res) {
    if(!!req.body.QuestionId && !!req.body.content){
        models.Question.findOne({
            where: {
                id: req.body.QuestionId
            }
        }).then(function(question){
            if(!!question){
                models.Answer.create({
                    content: req.body.content,
                    authorId: req.user.id,
                    QuestionId: req.body.QuestionId,
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

};

exports.deleteAnswer = function (req, res) {

};

exports.getAnswers = function (req, res) {

};

exports.upvoteAnswer = function (req, res) {

};

exports.downvoteAnswer = function (req, res) {

};
