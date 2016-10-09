'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Exchange = sequelize.define('Exchange', {
    year: {
      type: DataType.INTEGER(4),
    },
    term: {
      type: DataType.STRING(50),
    }
  }, {
    classMethods: {
      associate: function(models) {
        Exchange.belongsTo(models.University, {
          onDelete: 'CASCADE',
          foreignKey: {
            as: 'exchangeUniversityId',
            allowNull: false
          }
        });

        Exchange.belongsToMany(models.User, {
          as: 'exchangeStudent',
          through: 'student_exchange',
          foreignKey: 'exchangeId'
        });
      }
    }
  });

  return Exchange;
};