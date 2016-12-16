'use strict';

module.exports = function(sequelize, DataType){
    var FeedPostCommentReply = sequelize.define("FeedPostCommentReply", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return FeedPostCommentReply;
}
