'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var Story = sequelize.define('Story', {
        title: {
            type: DataType.STRING(255),
        },

        content: {
            type: DataType.TEXT(),
        },

        isPublic: {
            type: DataType.BOOLEAN(),
            defaultValue: true,
        },

        coverPhoto: {
            type: DataType.STRING(255),
            defaultValue: null,
        }
    }, {
        classMethods: {
            associate: function(models) {
                Story.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    as: "author"
                });

                Story.hasMany(models.StoryComment);
                Story.hasMany(models.StoryReaction);
            }
        }
    });

    return Story;
};
