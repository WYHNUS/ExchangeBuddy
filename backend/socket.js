var models = require('./models');
var ChatCtrl = require('./controller/ChatController');
var Group = models.Group;

module.exports = function(io){
    var groupsOfUsers = {};
    var allGroups = [];
    Group.findAll().then(function(groups){
        for(var group of groups){
            groupsOfUsers[group.name] = [];
            allGroups.push(group);
        }
    })

    io.sockets.on('connection', function(socket){
        console.log('connected');
        socket.on('adduser', function(data){
            groupsOfUsers[data.group.name].push(data.user.id);
            socket.user = data.user;
            socket.room = data.group;
            socket.join(socket.room.name);
        });

        socket.on('sendchat', function(msg){
            ChatCtrl.addChatMessage(socket.user, msg, socket.room);
            io.sockets.in(socket.room.name).emit('updatechat', socket.user.name, msg);
        });

        socket.on('switchroom', function(newroom){
            socket.leave(socket.room.name);
            groupsOfUsers[socket.room.name].splice(groupsOfUsers[socket.room.name].indexOf(socket.user.id), 1);

            socket.join(newroom.name);
            socket.room = newroom;
            groupsOfUsers[socket.room.name].push(socket.user.id);

        });

        socket.on('disconnect', function(){
            socket.leave(socket.room.name);
            groupsOfUsers[socket.room.name].splice(groupsOfUsers[socket.room.name].indexOf(socket.user.id), 1);
        })
    });
}
