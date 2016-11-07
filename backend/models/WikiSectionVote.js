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
      type: DataType.STRING(1000),
    }
  }, {
    classMethods: {
      associate: function(models) {
        WikiSectionVote.belongsTo(models.User);

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
