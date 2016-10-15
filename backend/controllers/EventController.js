var models = require('../models');

exports.createEvent = function(req, res){
    models.Event.create({
        lat: req.body.lat,
        lng: req.body.lng,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        detail: req.body.detail,
        imgSrc: req.body.imgSrc,
        GroupId: req.body.GroupId
    }).then(function(event){
        res.send({
            success: true
        });
    }).catch(function(err) {
        resError(res, err);
    });;
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
    }).catch(function(err) {
        resError(res, err);
    });;
}

exports.updateEvent = function(req, res){
    models.Event.update({
        lat: req.body.lat,
        lng: req.body.lng,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
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
    }).catch(function(err) {
        resError(res, err);
    });
}

exports.getAllEvents = function(req, res){
    models.Event.findAll({
        where: {
            GroupId: req.body.GroupId
        }
    }).then(function(events){
        res.send(events);
    }).catch(function(err) {
        resError(res, err);
    });
}

exports.goToEvent = function(req, res){
    models.sequelize.Promise.all([
        models.Event.findOne({
            where: {
                id: req.body.eventId
            }
        }),

        models.User.findOne({
            where: {
                id: req.body.userId
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

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
