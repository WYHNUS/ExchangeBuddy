'use strict';

module.exports = function(sequelize, DataType){
    var FeedPostComment = sequelize.define("FeedPostComment", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return FeedPostComment;
}
