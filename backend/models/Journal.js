'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Journal = sequelize.define('Journal', {
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
        Journal.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Journal;
};
