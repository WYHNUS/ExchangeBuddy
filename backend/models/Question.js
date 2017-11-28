'use strict';

module.exports = function(sequelize, DataType){
    var Question = sequelize.define("Question", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                Question.hasMany(models.QuestionComment, {
                    onDelete: "CASCADE"
                });
                Question.hasMany(models.QuestionVote, {
                    onDelete: "CASCADE"
                });
                Question.hasMany(models.Answer, {
                    onDelete: "CASCADE"
                });
                Question.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "author"
                })
            }
        }
    })
    return Question;
}
