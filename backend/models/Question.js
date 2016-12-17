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
                Question.hasMany(models.QuestionComment);
                Question.hasMany(models.QuestionVote);
                Question.hasMany(models.Answer);
                Question.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "author"
                })
            }
        }
    })
    return Question;
}
