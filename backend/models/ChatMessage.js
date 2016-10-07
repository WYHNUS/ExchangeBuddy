'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var ChatMessage = sequelize.define('ChatMessage', {
    message: {
  	  type: DataType.TEXT(),
  	}
  }, {
    classMethods: {
      associate: function(models) {
        // if user is deleted, still allow message to be displayed
        ChatMessage.belongsTo(models.User);

        // if group is deleted, all the message will be deleted as well
        ChatMessage.belongsTo(models.Group, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return ChatMessage;
};
