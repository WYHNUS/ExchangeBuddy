var models = require('../models');
var q = require('q');

exports.createEvent = function(req, res){
    models.sequelize.Promise.all([
        models.Event.create({
            lat: req.body.lat,
            lng: req.body.lng,
            title: req.body.title,
            startTime: new Date(req.body.startTime),
            endTime: new Date(req.body.endTime),
            detail: req.body.detail,
            imgSrc: req.body.imgSrc,
            GroupId: req.body.GroupId
        }),

        models.User.findOne({
            where: {
                id: req.body.UserId
            }
        })
    ]).spread(function(event, user){
        event.setUser(user);
        event.save();
        res.send({
            success: true
        });
    }).catch(function(err) {
        resError(res, err);
    });
}

exports.deleteEvent = function(req, res){
    models.Event.destroy({
        where: {
            id: req.body.EventId
        }
    }).then(function(count){
        if(count > 0){
            res.send({
                success: true
            })
        }else{
            res.send({
                success: false
            })
        }
    }).catch(function(err) {
        resError(res, err);
    });
}

exports.updateEvent = function(req, res){
    models.Event.update({
        lat: req.body.lat,
        lng: req.body.lng,
        title: req.body.title,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        detail: req.body.detail,
        imgSrc: req.body.imgSrc
    }, {
        where: {
            id: req.body.EventId
        }
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
                id: req.body.UserId
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

exports.comment = function(req, res){
    models.Comment.create({
        content: req.body.content,
        EventId: req.body.EventId,
        UserId: req.body.UserId
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
