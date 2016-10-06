'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataType.STRING(255),
    }
    year: {
      type: DataType.INTEGER(4),
    },
    term: {
      type: DataType.STRING(50),
    }
  }, {
    classMethods: {
      associate: function(models) {
        Group.belongsToMany(models.User, {
          as: 'group',
          through: 'chat_group',
          foreignKey: 'groupId'
        });

        Group.hasMany(models.ChatMessage);
      }
    }
  });

  return Group;
};
