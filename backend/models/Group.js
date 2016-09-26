'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    universityId: {
      type: DataType.INTEGER(),
    },

    year: {
      type: DataType.INTEGER(4),
    },

    term: {
      type: DataType.STRING(50),
    }
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });

  return Group;
};