var models = require('../models');
var ChatMessage = models.ChatMessage;

exports.addChatMessage = function(user, msg, group){
    return ChatMessage.create({
        message: msg,
        UserId: user.id,
        GroupId: group.id
    })
    
}

exports.getMessages = function(req, res){
    console.log('chatreq', req);
    ChatMessage.findAll({
        where: {
            GroupId: req.body.GroupId
        },
        include: [{
            model: models.User,
            attributes: ['name', 'profilePictureUrl', 'id']
        }]
    }).then(function(messages){
        res.send(messages);
    })
}
