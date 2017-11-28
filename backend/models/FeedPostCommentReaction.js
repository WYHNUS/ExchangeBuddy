'use strict';
var reactions = require('../config/config').reactions;

module.exports = function(sequelize, DataType){
    var FeedPostCommentReaction = sequelize.define("FeedPostCommentReaction", {
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
                FeedPostCommentReaction.belongsTo(models.User, {
                    onDelete: "CASCADE",
                })
            }
        }
    })
    return FeedPostCommentReaction;
}
