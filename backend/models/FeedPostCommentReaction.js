'use strict';

module.exports = function(sequelize, DataType){
    var FeedPostCommentReaction = sequelize.define("FeedPostCommentReaction", {
        reaction: {
            type: DataType.STRING(),
            allowNull: false,
            validate: {
                // add more reactions here
                isIn: [["like"]]
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
