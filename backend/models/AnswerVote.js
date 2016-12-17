'use strict';

module.exports = function(sequelize, DataType){
    var AnswerVote = sequelize.define("AnswerVote", {
        vote: {
            type: DataType.INTEGER(),
            allowNull: false,
            validate: {
                min: -1,
                max: 1,
            }
        }
    }, {
        classMethods: {
            associate: function(models){
                AnswerVote.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "voter"
                })
            }
        }
    })
    return AnswerVote;
}
