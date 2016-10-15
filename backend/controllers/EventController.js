var models = require('../models');

exports.createEvent = function(req, res){
    models.Event.create({
        lat: req.body.lat,
        lng: req.body.lng,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        detail: req.body.detail,
        imgSrc: req.body.imgSrc,
        GroupId: req.body.GroupId
    }).then(function(event){
        req.send({
            success: true
        });
    });
}

exports.deleteEvent = function(req, res){
    models.Event.destroy({
        where: {
            id: req.body.id
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
    });
}

exports.updateEvent = function(req, res){
    models.Event.update({
        lat: req.body.lat,
        lng: req.body.lng,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        detail: req.body.detail,
        imgSrc: req.body.imgSrc
    }, {
        where: {
            id: req.body.id
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
    })
}

exports.getAllEvents = function(req, res){
    models.Event.findAll({
        where: {
            GroupId: req.body.GroupId
        }
    }).then(function(events){
        res.send(events);
    })
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
                id: req.body.userId
            }
        })
    ]).spread(function(event, user){
        event.addUserEvent(user);
        res.send({
            success: true
        });
    })

}
