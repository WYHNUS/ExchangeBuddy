'use strict';

module.exports = function(sequelize, DataType){
    var FeedPost = sequelize.define("FeedPost", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return FeedPost;
}
