'use strict';

module.exports = function(sequelize, DataType){
    var AnswerComment = sequelize.define("AnswerComment", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                AnswerComment.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    as: 'author',
                });

                AnswerComment.hasMany(models.AnswerVote);

            }
        }
    })
    return AnswerComment;
}
