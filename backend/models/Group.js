'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataType.STRING(255),
    },
    /*
    groupType attribute is currently restricted to 3 default groups
    0: default group of same exchange university, same year, same semester
    1: default group of same home university, same year, same semester
    2: default group of same home university, same exchange university
    */
    groupType: {
      type: DataType.INTEGER(1),
      min: 0,
      max: 2,
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
