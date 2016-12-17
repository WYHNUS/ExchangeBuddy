'use strict';

module.exports = function(sequelize, DataType){
    var FeedPostReaction = sequelize.define("FeedPostReaction", {
        reaction: {
            type: DataType.STRING(),
            allowNull: false,
            validate: {
                // add more reactions here
                isIn: [["like"]]
            }
        }
    }, {
        classMethods: {
            associate: function(models){
                FeedPostReaction.belongsTo(models.User, {
                    onDelete: "CASCADE",
                })
            }
        }
    })
    return FeedPostReaction;
}
