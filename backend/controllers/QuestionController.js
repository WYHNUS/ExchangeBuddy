var models = require('../models');
var Question = models.Question;
var QuestionVote = models.QuestionVote;

exports.createQuestion = function(req, res){
    
}

exports.updateQuestion = function(req, res){

}

exports.deleteQuestion = function(req, res){

}

exports.getQuestions = function(req, res){

}

exports.voteQuestion = function(req, res){
    // check if question exists
    Question.findById(req.params.id)
    .then((question) => {
        if (!!question) {
            res.status(400).json({
                status: 'fail',
                message: "Question doesn't exist"
            });
        } else {
            QuestionVote.findOrCreate({
                where: {
                    QuestionId: req.params.id,
                    voterId: req.user.id
                },
                defaults: {
                    vote: req.body.vote
                }
            })
            .spread((vote, created) => {
                if (!created){
                    if (req.body.vote != vote.vote){
                        vote.update({
                            vote: req.body.vote
                        })
                        .then(newVote => {
                            res.status(200).json({
                                status: 'success',
                                message: 'vote updated',
                                vote: newVote
                            })
                        })
                        .catch(err => {
                            res.status(400).json({
                                status: 'fail',
                                message: err.message
                            })
                        })
                    } else {
                        res.status(400).json({
                            status: 'fail',
                            message: 'vote already exists',
                            vote: vote 
                        })
                    }
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: req.body.vote === 1 ? 'Upvoted' : 'Downvoted',
                        vote: vote
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    status: 'fail',
                    message: err.message
                })
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    });
}
