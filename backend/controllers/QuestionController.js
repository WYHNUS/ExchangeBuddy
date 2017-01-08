var models = require('../models');
var Question = models.Question;
var QuestionVote = models.QuestionVote;

exports.createQuestion = function(req, res){
	if(!!req.body.content && !!req.body.UniversityId)
	{
		models.Question.create(
		{
			authorId: req.user.id,
			content: req.body.content,
			UniversityId: req.body.UniversityId,
		}).then(function(question)
		{
			res.status(200).send({
				status: 'success',
				message: 'Question created',
			})
		})
	}
	else
	{
		res.status(400).send({
			status: 'fail',
			message: 'missing content or UniversityId'
		})
	}
}

exports.updateQuestion = function(req, res){
	if(!!req.body.content && !!req.params.id){
		models.Question.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(question){
			if(!!question){
				if(question.authorId == req.user.id){
					question.update({
						content: req.body.content
					}).then(function(question){
						res.status(200).send({
							status: 'success'
						})
					})
				}else{
					res.status(401).send({
						status: 'fail',
						message: 'question does not belong to user'
					})
				}
			}else{
				res.status(400).send({
					status: 'fail',
					message: 'invalid Question id'
				})
			}
		})
	}
}

exports.deleteQuestion = function(req, res){
	if(!!req.params.id){
		models.Question.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(count){
			if(count < 1){
				res.status(400).send({
					status: 'fail',
					message: 'no entry associated with given question id'
				})
			}else{
				res.status(200).send({
					status: 'success',
					message: 'instance deleted'
				})
			}
		})
	}else{
		res.status(400).send({
			status: 'fail',
			message: 'missing question id'
		})
	}
}

exports.getQuestions = function(req, res){
	models.Question.findAll({
		attributes: ['id', 'content', 'CountryAlpha2Code'],
		order: [
			['createdAt', 'DESC']
		],
		// include:[{
		// 	model: models.Country,
		// 	as: 'country'
		// }],
		// where: {
		// 	$or: [
	 //            {'country.CountryAlpha2Code' : 'CountryAlpha2Code'}
	 //        ]
		// }
	}).then(function(comments){
		if(!!comments){
			res.status(200).send({
				status: 'success',
				data: comments
			})
		}else{
			res.status(400).send({
				status: 'fail',
				message: 'invalid feedpost id'
			})
		}
	})

}

exports.voteQuestion = function(req, res){
    // check if question exists
    Question.findById(req.params.id)
    .then((question) => {
        if (!question) {
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

exports.unvoteQuestion = function(req, res){
    QuestionVote.destroy({
        where: {
            QuestionId: req.params.id,
            voterId: req.user.id
        }
    })
    .then(affectedRows => {
        if (affectedRows == 1){
            res.status(204).send();
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'question vote not found'
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
