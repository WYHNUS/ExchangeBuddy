'use strict';

module.exports = function(sequelize, DataType){
    var StoryReaction = sequelize.define("StoryReaction", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return StoryReaction;
}
