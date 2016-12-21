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

                FeedPost.belongsTo(models.Group, {
                    onDelete: "CASCADE",
                })

                FeedPost.hasMany(models.FeedPostComment);
                FeedPost.hasMany(models.FeedPostReaction);
            }
        }
    })
    return FeedPost;
}
