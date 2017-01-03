var models = require('../models');

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

exports.voteQuestionUp = function(req, res){

}

exports.voteQuestionDown = function(req, res){
    
}
