'use strict';

module.exports = function(sequelize, DataType){
    var FeedPostCommentReply = sequelize.define("FeedPostCommentReply", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                FeedPostCommentReply.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "author",
                });

                
            }
        }
    })
    return FeedPostCommentReply;
}
