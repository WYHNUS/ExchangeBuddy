var models = require('../models');
var User = models.User;
var Group = models.Group;
var ChatMsg = models.ChatMessage;

// Get all groups current user belongs to
exports.getGroupIndex = function(req, res) {
	Group.findAll({
		order: [
			['updatedAt', 'DESC']
		],
		attributes: ['id', 'name'],
		include: [{
			attributes: ['name', 'email'],
			model: User,
			as: 'user',
			through: {
				where: {
					userId: req.body.userId
				}
			}
		}]
	}).then(function(groups) {
		res.json(groups);
	}).catch(function(err) {
		res.status(500).json({
			message: err.message
		});
	});
};

// Show group if user belongs to it
exports.getGroup = function(req, res) {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name'],
        include: [{
        	attributes: ['id', 'displayName', 'profilePictureUrl'],
        	model: User,
        	as: 'user',
        	through: {
				where: {
					userId: req.user.id
				}
			}
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
			res.send(users);
		})
	})
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
