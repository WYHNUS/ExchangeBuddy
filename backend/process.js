var app = require('./app')
var models = require('./models');


models.Group.findAll({
    where: {
        groupType: 1
    }
}).then(function(groups){
    models.sequelize.Promise.all(groups.map((group) => (group.getUser()))).then(function(users){
        var newGroups = [];
        var queries = [];
        for(var group of groups){
            var name = group.name;
            var name_array = name.split(' ');
            name_array.pop();
            var newGroup = {groupType : 1};
            newGroup.name = name_array.join(' ');
            newGroups.push(newGroup);
        }

        for(var i = 0; i < newGroups.length; i++){
            newGroups[i].users = users[i];
        }

        for(var i = 0; i < newGroups.length; i++){
            var found = false;
            for(var j = 0; j < queries.length; j++){
                if(newGroups[i].name == queries[j].name){
                    queries[j].users = queries[j].users.concat(newGroups[i].users);
                    found = true;
                    break;
                }
            }

            if(!found){
                queries.push(newGroups[i]);
            }
        }



        models.sequelize.Promise.all(
            queries.map(
                (newGroup) => (
                    models.Group.create({
                        groupType: newGroup.groupType,
                        name: newGroup.name
                    })
                )
            )
        ).then(function(groups){
            for(var i = 0; i < groups.length; i++){
                groups[i].addUser(queries[i].users);
            }
        })

        groups.map((group) => {
            group.removeUser();
            group.destroy();
        })

    })

})
