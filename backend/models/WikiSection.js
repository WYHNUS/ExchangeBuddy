'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var WikiSection = sequelize.define('WikiSection', {
    name: {
  	  type: DataType.STRING(255),
      unique: true,
  	},

    // to make query faster (hopefully)
    displayVersionNumber: {
      type: DataType.INTEGER(),
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
        WikiSection.belongsTo(models.Wiki);

        WikiSection.hasMany(models.WikiSectionVersion);
      }
    }
  });

  return WikiSection;
};
