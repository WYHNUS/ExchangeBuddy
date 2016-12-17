'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var Country = sequelize.define('Country', {
        // Use this as the primary key to identify countries
        // Has to be uppercase.
        alpha2Code: {
            type: DataType.CHAR(2),
            primaryKey: true,
        },

        // Other fields
        name: {
            type: DataType.TEXT(),
        },
        alpha3Code: {
            type: DataType.CHAR(3),
        },
        region: {
            type: DataType.STRING(250),
        },
        subregion: {
            type: DataType.TEXT(),
        },
        capital: {
            type: DataType.TEXT(),
        },
        lat: {
            type: DataType.DOUBLE(),
        },
        lng: {
            type: DataType.DOUBLE(),
        },
        population: {
            type: DataType.INTEGER(),
        },

        // related images
        logoImage: {
            type: DataType.STRING(1024),
            defaultValue: null
        },
        backgroundImage: {
            type: DataType.STRING(1024),
            defaultValue: null
        },

        // Stored as JSON stringified arrays
        currencies: {
            type: DataType.TEXT(),
        },
        languages: {
            type: DataType.TEXT(),
        },
        timezones: {
            type: DataType.TEXT(),
        },
        callingCodes: {
            type: DataType.TEXT(),
        }
    }, {
        classMethods: {
            associate: function(models) {
                Country.hasOne(models.Wiki);

                Country.hasMany(models.User);

                Country.hasMany(models.University);
            }
        }
    });

    return Country;
};
