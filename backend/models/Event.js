'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var Event = sequelize.define('Event', {
        lat: {
            type: DataType.DOUBLE()
        },
        lng: {
            type: DataType.DOUBLE()
        },
        title: {
            type: DataType.STRING(),
            allowNull: false
        },
        startTime: {
            type: DataType.DATE()
        },
        endTime: {
            type: DataType.DATE()
        },
        detail: {
            type: DataType.TEXT()
        },
        imgSrc: {
            type: DataType.TEXT()
        },

    }, {
        classMethods: {
            associate: function(models){
                Event.belongsToMany(models.User, {
                    as: "userEvent",
                    through: "user_event",
                    foreignKey: "eventId"
                });

                Event.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: "UserId"
                })

                Event.belongsTo(models.Group, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        as: "groupId",
                        allowNull: false
                    }
                });
            }
        }
    })

    return Event;
}
