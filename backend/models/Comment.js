'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var Comment = sequelize.define('Comment', {
        content: {
            type: DataType.TEXT(),
        }
    }, {
        classMethods: {
            associate: function(models){
                Comment.belongsTo(models.Event, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        as: "eventId",
                        allowNull: false
                    }
                });

                Comment.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: "UserId"
                })
            }
        }
    })

    return Comment;
}
