'use strict';
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
      unique: true,
    },

    displayName: {
      type: DataType.TEXT(),
    },

    profilePictureId: {
      type: DataType.STRING(255),
    },

    gender: {
      type: DataType.ENUM('male', 'female', 'others'),
    },

    bio: {
      type: DataType.TEXT('long'),
    },

    website: {
      type: DataType.TEXT(),
    },

    birthday: {
      type: DataType.DATEONLY(),
    },

    // Don't use BIGINT because there's some serious bug in Sequelize or something...
    // A BIGINT has at most 20 digits (if unsigned)
    fbUserId: {
      type: DataType.STRING(),
      unique: true,
    },

    fbToken: {
      type: DataType.TEXT(),
    },

    fbTokenExpiresAt: {
      type: DataType.DATE(),
    },

    homeUniId: {
      type: DataType.INTEGER(),
    },

    homeUniEmail: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },

    homeUniEmailVerified: {
      type: DataType.BOOLEAN(),
    },

    // 2-letter country code
    homeCountryCode: {
      type: DataType.CHAR(2),
    },

    defaultGroupId: {
      type: DataType.INTEGER(),
    }
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    },
    instanceMethods: {
      generateJwt: function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
          id: this.id,
          email: this.email,
          displayName: this.displayName,
          fbUserId: this.fbUserId,
          profilePictureId: this.profilePictureId,
          exp: parseInt(expiry.getTime() / 1000),
        }, config.secret);
      }
    }
  });

  return User;
};