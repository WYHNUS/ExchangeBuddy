'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var University = sequelize.define('University', {
        name: {
            type: DataType.STRING(255),
            unique: true,
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

        // AWS images
        logoImageUrl: {
            type: DataType.STRING(1000),
        },
        bgImageUrl: {
            type: DataType.STRING(1000),
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
                University.belongsTo(models.Country);

                University.hasOne(models.Wiki);

                University.hasMany(models.User, {
                    as: 'homeUniversity',
                    onDelete: 'SET NULL',
                });

                University.hasMany(models.Exchange, {
                    as: 'exchangeUniversity',
                    onDelete: 'CASCADE',
                });

                University.hasMany(models.UniversityCourse);
                University.hasMany(models.Question, {
                    foreignKey: {
                        allowNull: true
                    }
                });
            }
        }
    });

    return University;
};
