var models = require('./models');
var ChatCtrl = require('./controllers/ChatController');
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

    // no error feedback to socket, assume all data format correct

    io.sockets.on('connection', function(socket){
        console.log('connected');
        /* adduser
        expected data formate:
        {
            user: {
                id: 1,
                name: 'hello'
            },
            group: {
                id: 1,
                name: 'nus'
            }
        }
        */
        socket.on('adduser', function(data){
            try{
                groupsOfUsers[data.group.name].push(data.user.id);
                socket.user = data.user;
                socket.room = data.group;
                socket.join(socket.room.name);
            }catch(error){
                console.log(error);
            }

        });

        socket.on('sendchat', function(msg){
            try{
                ChatCtrl.addChatMessage(socket.user, msg, socket.room);
                io.sockets.in(socket.room.name).emit('updatechat', socket.user.name, msg);
            }catch(error){
                console.log(error);
            }

        });

        /* switchroom
        expected data formate:
        {
            name: 'nus'
        }
        */
        socket.on('switchroom', function(newroom){
            try{
                socket.leave(socket.room.name);
                groupsOfUsers[socket.room.name].splice(groupsOfUsers[socket.room.name].indexOf(socket.user.id), 1);

                socket.join(newroom.name);
                socket.room = newroom;
                groupsOfUsers[socket.room.name].push(socket.user.id);
            }catch(error){
                console.log(error);
            }


        });

        socket.on('disconnect', function(){
            try{
                socket.leave(socket.room.name);
                groupsOfUsers[socket.room.name].splice(groupsOfUsers[socket.room.name].indexOf(socket.user.id), 1);
            }catch(error){
                console.log(error);
            }

        })
    });
}
