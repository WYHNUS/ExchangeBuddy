'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var WikiSectionVote = sequelize.define('WikiSectionVote', {
    score: {
      type: DataType.INTEGER(1),
      min: -1,
      max: 1,
      allowNull: false
  	},

    comment: {
      type: DataType.TEXT(),
    }
  }, {
    classMethods: {
      associate: function(models) {
        WikiSectionVote.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });

        WikiSectionVote.belongsTo(models.WikiSectionVersion, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return WikiSectionVote;
};
