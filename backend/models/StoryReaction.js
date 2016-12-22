'use strict';
var reactions = require('../config/config').reactions;

module.exports = function(sequelize, DataType){
    var StoryReaction = sequelize.define("StoryReaction", {
        reaction: {
            type: DataType.STRING(),
            allowNull: false,
            validate: {
                // add more reactions here
                isIn: reactions
            }
        }
    }, {
        classMethods: {
            associate: function(models){
                StoryReaction.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                })
            }
        }
    })
    return StoryReaction;
}
