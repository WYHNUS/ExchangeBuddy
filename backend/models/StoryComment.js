'use strict';

module.exports = function(sequelize, DataType){
    var StoryComment = sequelize.define("StoryComment", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                StoryComment.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: 'author',
                })
            }
        }
    })
    return StoryComment;
}
