'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Wiki = sequelize.define('Wiki', {
    title: {
      type: DataType.STRING(255),
      allowNull: false,
    },

    view: {
      type: DataType.INTEGER(),
      defaultValue: 0,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Wiki.belongsTo(models.University);
        Wiki.belongsTo(models.Country);
        Wiki.belongsTo(models.User);

        Wiki.hasMany(models.WikiSection);
      }
    }
  });

  return Wiki;
};
