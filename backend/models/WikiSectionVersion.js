'use strict';

module.exports = function(sequelize, DataType) {
  var WikiSectionVersion = sequelize.define('WikiSectionVersion', {
    title: {
      type: DataType.STRING(255),
      allowNull: false,
    },

    content: {
      type: DataType.TEXT(),
      allowNull: false,
    },

    versionNumber: {
      type: DataType.INTEGER(),
      allowNull: false,
    },

    score: {
      type: DataType.INTEGER(),
      defaultValue: 0,
    }
  }, {
    classMethods: {
      associate: function(models) {
        WikiSectionVersion.belongsTo(models.WikiSection, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });

        WikiSectionVersion.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });

        WikiSectionVersion.hasMany(models.WikiSectionVote);
      }
    }
  });

  return WikiSectionVersion;
};
