'use strict';

module.exports = function(sequelize, DataType){
    var QuestionComment = sequelize.define("QuestionComment", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                QuestionComment.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "author",
                })
            }
        }
    })
    return QuestionComment;
}
