var models = require('./models');
var Group = models.Group;

module.exports = function(io){
    var groupsOfUsers = {}
    Group.findAll().then(function(groups){
        for(var group of groups){
            groupsOfUsers[group.name] = [];
        }
    })

    io.sockets.on('connection', function(socket){
        console.log('connected');
        socket.on('adduser', function(data){
            groupsOfUsers[data.group].push(data.user);
            socket.user = data.user;
            socket.room = data.group;
            socket.join(socket.room);
        });

        socket.on('sendchat', function(msg){
            io.sockets.in(socket.room).emit('updatechat', socket.user, msg);
        });

        socket.on('switchroom', function(newroom){
            socket.leave(socket.room);
            groupsOfUsers[socket.room].splice(groupsOfUsers[socket.room].indexOf(socket.user), 1);

            socket.join(newroom);
            socket.room = newroom;
            groupsOfUsers[socket.room].push(socket.user);

        });

        socket.on('disconnect', function(){
            socket.leave(socket.room);
            groupsOfUsers[socket.room].splice(groupsOfUsers[socket.room].indexOf(socket.user), 1);
        })
    });
}
