'use strict';

module.exports = function(sequelize, DataType){
    var AnswerComment = sequelize.define("AnswerComment", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return AnswerComment;
}
