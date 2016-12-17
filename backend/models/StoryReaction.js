'use strict';

module.exports = function(sequelize, DataType){
    var StoryReaction = sequelize.define("StoryReaction", {
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
                StoryReaction.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                })
            }
        }
    })
    return StoryReaction;
}
