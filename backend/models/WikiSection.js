'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var WikiSection = sequelize.define('WikiSection', {
    // the index to display in particular wiki page
    sectionIndex: {
      type: DataType.INTEGER(),
    },

    // to make query faster (hopefully)
    //    --> later will have Archive to store past versions when expecting infrequent change
    displayVersionNumber: {
      type: DataType.INTEGER(),
      allowNull: false,
    },

    totalVersionCount: {
      type: DataType.INTEGER(),
      allowNull: false,
    },

    sectionType: {
      type: DataType.STRING(50),
      validate: {
          isIn: [
              ['OpenToEdit', 'SemiProtected', 'Protected']
          ]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        WikiSection.belongsTo(models.Wiki, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
        WikiSection.belongsTo(models.User, {
            onDelete: "CASCADE",
            as: "author"
        });

        WikiSection.hasMany(models.WikiSectionVersion);
      }
    }
  });

  return WikiSection;
};
