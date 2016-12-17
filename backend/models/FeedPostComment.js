'use strict';

module.exports = function(sequelize, DataType){
    var FeedPostComment = sequelize.define("FeedPostComment", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                FeedPostComment.hasMany(models.FeedPostCommentReply);
                FeedPostComment.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: 'author',
                })
            }
        }
    })
    return FeedPostComment;
}
