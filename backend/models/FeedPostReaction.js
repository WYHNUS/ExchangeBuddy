'use strict';
var reactions = require('../config/config').reactions;

module.exports = function(sequelize, DataType){
    var FeedPostReaction = sequelize.define("FeedPostReaction", {
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
                FeedPostReaction.belongsTo(models.User, {
                    onDelete: "CASCADE",
                })
            }
        }
    })
    return FeedPostReaction;
}
