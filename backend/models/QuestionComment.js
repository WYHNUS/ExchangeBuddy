'use strict';

module.exports = function(sequelize, DataType){
    var QuestionComment = sequelize.define("QuestionComment", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return QuestionComment;
}
