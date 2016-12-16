'use strict';

module.exports = function(sequelize, DataType){
    var Question = sequelize.define("Question", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return Question;
}
