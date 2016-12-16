'use strict';

module.exports = function(sequelize, DataType){
    var StoryComment = sequelize.define("StoryComment", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return StoryComment;
}
