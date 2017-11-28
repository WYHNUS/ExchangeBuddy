'use strict';

module.exports = function(sequelize, DataType){
    var QuestionVote = sequelize.define("QuestionVote", {
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
                QuestionVote.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    as: "voter"
                })
            }
        }
    })
    return QuestionVote;
}
