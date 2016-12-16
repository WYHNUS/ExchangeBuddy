'use strict';

module.exports = function(sequelize, DataType){
    var Answer = sequelize.define("Answer", {

    }, {
        classMethods: {
            associate: function(models){
                
            }
        }
    })
    return Answer;
}
