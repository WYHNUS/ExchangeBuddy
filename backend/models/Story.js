'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Story = sequelize.define('Story', {
    content: {
      type: DataType.TEXT(),
    },

    isPublic: {
      type: DataType.BOOLEAN(),
      defaultValue: true,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Story.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Story;
};
