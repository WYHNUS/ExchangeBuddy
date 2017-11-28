var models = require('../models');

exports.createAnswer = function(req, res) {
    if (!!req.params.id && !!req.body.content) {
        models.Question.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(question) {
            if (!!question) {
                models.Answer.create({
                    content: req.body.content,
                    authorId: req.user.id,
                    QuestionId: req.params.id,
                }).then(function(answer) {
                    if (!!answer) {
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

exports.updateAnswer = function(req, res) {
    if (!!req.body.content && !!req.params.id) {
        models.Answer.findOne({
            where: {
                id: req.params.id,
                anthorId: req.user.id,
            }
        }).then(function(answer) {
            if (!!answer) {
                answer.update({
                    content: req.body.content
                }).then(function(answer) {
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

exports.deleteAnswer = function(req, res) {
    models.Answer.findOne({
        where: {
            id: req.params.id,
            authorId: req.user.id,
        }
    }).then(function(answer) {
        if (!!answer) {
            answer.destroy().then(function() {
                res.status(200).send({
                    status: 'success',
                    message: 'instance deleted',
                })
            });
        } else {
            res.status(400).send({
                status: 'fail',
                message: 'answer entry not found',
            })
        }
    });
};

exports.getAnswers = function(req, res) {
    models.Answer.findAll({
        where: {
            QuestionId: req.params.id,
        },
        attributes: ['id', 'content'],
        include: [{
            model: models.AnswerComment,
            attributes: ['id', 'content'],
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                model: models.User,
                as: 'author',
                attributes: ['id', 'name', 'profilePictureUrl']
            }]
        }]
    }).then(function(answers){
        models.sequelize.Promise.all(
            answers.map(answer => answer.getAnswerVotes())
        ).then(function(answersVotes){
            for(var i = 0; i < answersVotes.length; i++){
                var totalVote = 0;
                for(var answerVote of answersVotes[i]){
                    totalVote　+= answerVote.vote;
                }
                answers[i].setDataValue('totalVote', totalVote);
            }
            res.send(answers);
        })
    })
};

exports.voteAnswer = function(req, res){
    if(!!req.body.vote){
        if(vote == 1 || vote == -1){
            models.AnswerVote.findOne({
                where: {
                    AnswerId: req.params.id,
                    voterId: req.user.id,
                }
            }).then(function(vote){
                if(!!vote){
                    models.AnswerVote.create({
                        vote: req.body.vote,
                        AnswerId: req.params.id,
                        voterId: req.user.id,
                    }).then(function(newVote){
                        res.status(200).send({
                            message: 'vote created'
                        });
                    });
                } else {
                    if(vote.vote == req.body.vote){
                        res.status(400).send({
                            message: 'user already voted',
                        });
                    } else {
                        vote.destroy().then(function(){
                            res.status(200).send({
                                message: 'vote deleted',
                            })
                        })
                    }
                }
            })
        } else {
            res.status(400).send({
                message: 'invalid vote',
            });
        }

    }else{
        res.status(400).send({
            message: 'missing vote'
        });
    }
}
