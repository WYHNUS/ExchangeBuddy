'use strict';

module.exports = function(sequelize, DataType){
    var QuestionVote = sequelize.define("QuestionVote", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return QuestionVote;
}
