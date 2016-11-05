var models = require('../models');
var User = models.User;
var Group = models.Group;
var ChatMsg = models.ChatMessage;
var University = models.University;

// Get all groups current user belongs to
exports.getGroupIndex = function(req, res) {
	User.findOne({
		where: {
			id: req.body.userId
		}
	}).then(function(user){
		user.getGroup().then(function(groups){
			models.sequelize.Promise.all(
				groups.map(group => group.countUser())
			).then(function(counts){
				for(var i = 0; i < groups.length; i++){
					groups[i].dataValues.number = counts[i];
				}
				res.send(groups);
			})
		})
	}).catch(function(err) {
		res.status(500).json({
			message: err.message
		});
	});

};

exports.joinGroup = function(req, res){
	models.sequelize.Promise.all([
		models.User.findOne({
			where: {
				id: req.user.id
			}
		}),
		models.Group.findOne({
			where: {
				id: req.body.GroupId
			}
		})
	]).spread(function(user, group){
		if(!!user && !!group){
			group.addUser(user);
			res.send({
				success: true
			})
		}else{
			res.status(400).send({
				success: false
			})
		}
	})
}

exports.leaveGroup = function(req, res){
	models.Group.findOne({
		where: {
			id: req.body.GroupId
		}
	}).then(function(group){
		if(!!group){
			group.removeUser(req.user.id);
			res.send({
				success: true
			})
		}else{
			res.status(400).send({
				success: false;
			})
		}
	})
}

// Show group if user belongs to it
exports.getGroup = function(req, res) {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'groupType'],
        include: [{
        	attributes: ['id', 'name', 'profilePictureUrl'],
        	model: User,
        	as: 'user',
			include: [{
				attributes: ['name', 'id'],
				model: University
			}]
        	// through: {
			// 	where: {
			// 		userId: req.user.id
			// 	}
			// }
        }, {
        	attributes: ['message'],
        	model: ChatMsg
        }]
    }).then(function(group) {
        res.json(group);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.getMembers = function(req, res){
	Group.findOne({
		where: {
			id: req.body.GroupId
		}
	}).then(function(group){
		group.getUser().then(function(users){
			res.json(
				users.map(user => ({
					id: user.id,
					name: user.name,
					profilePictureUrl: user.profilePictureUrl
				}))
			);
		})
	})
}

exports.getGroups = function(req, res){
	Group.findAll({
		attributes: ['id', 'name', 'groupType']
	}).then(function(groups){
		res.json(groups);
	})
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
