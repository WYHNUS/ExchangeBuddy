'use strict';

module.exports = function(sequelize, DataType){
    var FeedPost = sequelize.define("FeedPost", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                FeedPost.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "author"
                });


                FeedPost.hasMany(models.FeedPostComment, {
                    onDelete: "CASCADE"
                });
                FeedPost.hasMany(models.FeedPostReaction, {
                    onDelete: "CASCADE"
                });
            }
        }
    })
    return FeedPost;
}
