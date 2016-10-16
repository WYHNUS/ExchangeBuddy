var models = require('../models');
var ChatMessage = models.ChatMessage;

exports.addChatMessage = function(user, msg, group){
    ChatMessage.create({
        message: msg,
        UserId: user.id,
        GroupId: group.id
    }).then(function(chat){
        res.send({
            status: 'success'
        });
    });
}

exports.getMessages = function(req, res){
    ChatMessage.findAll({
        where: {
            GroupId: req.body.GroupId
        }
    }).then(function(messages){
        res.send(messages);
    })
}
