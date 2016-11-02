var models = require('../models');
var q = require('q');

exports.createEvent = function(req, res){
    models.sequelize.Promise.all([
        models.Event.create({
            lat: req.body.obj.lat,
            lng: req.body.obj.lng,
            location: req.body.obj.location,
            title: req.body.obj.title,
            startTime: new Date(req.body.obj.startTime),
            endTime: new Date(req.body.obj.endTime),
            detail: req.body.obj.detail,
            imgSrc: req.body.obj.imgSrc,
            GroupId: req.body.obj.GroupId
        }),

        models.User.findOne({
            where: {
                id: req.user.id
            }
        })
    ]).spread(function(event, user){
        event.setUser(user);
        event.save();
        res.send({
            success: true
        });
    }).catch(function(err) {
        console.log(err);
        resError(res, err);
    });
}

exports.deleteEvent = function(req, res){
    models.Event.findOne({
        where: {
            id: req.body.EventId
        }
    }).then(function(event){
        event.getUser().then(function(user){
            if(user.id == req.user.id){
                event.destroy();
                res.send({
                    success: true
                })
            }else{
                res.status(401).json({
                    success: false,
                    message: "unauthorized"
                })
            }
        })
    })
}

exports.updateEvent = function(req, res){
    models.Event.findOne({
        where: {
            id: req.body.EventId
        }
    }).then(function(event){
        event.getUser().then(function(user){
            if(user.id == req.user.id){
                event.update({
                    lat: req.body.lat,
                    lng: req.body.lng,
                    location: req.body.location,
                    title: req.body.title,
                    startTime: new Date(req.body.startTime),
                    endTime: new Date(req.body.endTime),
                    detail: req.body.detail,
                    imgSrc: req.body.imgSrc
                }).then(function(response){
                    if(response.length > 0){
                        res.send({
                            success: true
                        })
                    }else{
                        res.send({
                            success: false
                        })
                    }
                })
            } else {
                res.status(401).json({
                    success: false,
                    message: "unauthorized"
                })
            }
        })
    }).catch(function(err) {
        resError(res, err);
    });

}

exports.getAllEvents = function(req, res){
    models.Event.findAll({
        where: {
            GroupId: req.body.GroupId
        },
        include: [{
            attributes: ['profilePictureUrl', 'name', 'id'],
            model: models.User
        }]
    }).then(function(events){
        var deferred = q.defer();
        var promises = events.map(event => event.getUserEvent());
        models.sequelize.Promise.all(promises).then(function(userEvents){
            userEvents = userEvents.map(users => (users.map(user => (
                {

                    name: user.name,
                    id: user.id,
                    profilePictureUrl: user.profilePictureUrl,
                    UniversityId: user.UniversityId

                }
            ))));
            for(var i = 0; i < userEvents.length; i++){
                events[i].setDataValue("going", userEvents[i]);
            }
            deferred.resolve(events)
        })

        deferred.promise.then(function(allEvents){
            res.send(allEvents);
        })
    }).catch(function(err) {
        resError(res, err);
    });
}

exports.goToEvent = function(req, res){
    models.sequelize.Promise.all([
        models.Event.findOne({
            where: {
                id: req.body.EventId
            }
        }),
        models.User.findOne({
            where: {
                id: req.user.id
            }
        })
    ]).spread(function(event, user){
        if(!!event && !!user){
            event.addUserEvent(user);
            res.send({
                success: true
            });
        }else{
            res.send({
                success: false,
                error: "user or event doesn't exist"
            })
        }

    }).catch(function(err) {
        resError(res, err);
    });
}

exports.unGoToEvent = function(req, res){
    models.sequelize.Promise.all([
        models.Event.findOne({
            where: {
                id: req.body.EventId
            }
        }),
        models.User.findOne({
            where: {
                id: req.user.id
            }
        })
    ]).spread(function(event, user){
        if(!!event && !!user){
            event.removeUserEvent(user);
            res.send({
                success: true
            });
        }else{
            res.send({
                success: false,
                error: "user or event doesn't exist"
            })
        }
    })
}

exports.comment = function(req, res){
    models.Comment.create({
        content: req.body.content,
        EventId: req.body.EventId,
        UserId: req.user.id
    }).then(function(comment){
        res.send({
            success: true
        })
    }).catch(function(err){
        resError(res, err);
    })
}

exports.getComments = function(req, res){
    models.Comment.findAll({
        where: {
            EventId: req.query.eventId
        },
        include: [{
            attributes: ['profilePictureUrl', 'name', 'id'],
            model: models.User
        }]
    }).then(function(comments){
        res.send(comments);
    })
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
