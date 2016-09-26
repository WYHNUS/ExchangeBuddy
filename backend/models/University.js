'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataTypes) {
  var University = sequelize.define('University', {
    name: {
  	  type: DataType.TEXT(),
  	},
  	city: {
      type: DataType.TEXT(),
  	},
  	website: {
  	  type: DataType.TEXT(),
  	},
  	fbPageId: {
  	  type: DataType.STRING(20),
  	},

  	// Retrievable from topuniversities.com
  	countryCode: {
      type: DataType.CHAR(2),
  	},
  	logoUrl: {
      type: DataType.TEXT(),
  	},
  	linkUrl: {
      type: DataType.TEXT(),
  	},

  	// Cloudinary images
  	logoImageId: {
      type: DataType.STRING(255),
  	},
  	bgImageId: {
      type: DataType.STRING(255),
  	},

  	// JSON.stringify()-ed strings
  	emailDomains: {
      type: DataType.TEXT(),
  	},
  	terms: {
      type: DataType.TEXT(),
  	},

  	// Refers to the cid field when retrieving from topuniversities.com
  	topUnisId: {
      type: DataType.INTEGER(),
      unique: true,
  	}
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });

  return University;
};