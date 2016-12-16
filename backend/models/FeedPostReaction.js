'use strict';

module.exports = function(sequelize, DataType){
    var FeedPostReaction = sequelize.define("FeedPostReaction", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return FeedPostReaction;
}
