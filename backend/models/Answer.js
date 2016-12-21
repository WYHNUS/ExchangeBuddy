'use strict';

module.exports = function(sequelize, DataType){
    var Answer = sequelize.define("Answer", {
        content: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models){
                Answer.hasMany(models.AnswerComment, {
                    onDelete: "CASCADE"
                });
                Answer.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "author",
                })
            }
        }
    })
    return Answer;
}
