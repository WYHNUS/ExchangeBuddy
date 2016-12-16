'use strict';

module.exports = function(sequelize, DataType){
    var AnswerVote = sequelize.define("AnswerVote", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return AnswerVote;
}
