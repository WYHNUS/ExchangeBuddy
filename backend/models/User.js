'use strict';
var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var User = sequelize.define('User', {
        email: {
            type: DataType.STRING(255),
            validate: {
                isEmail: true
            },
            unique: true,
        },

        name: {
            type: DataType.TEXT(),
        },

        // this is set to be facebook image url
        profilePictureUrl: {
            type: DataType.STRING(255),
        },

        gender: {
            type: DataType.STRING(255),
            validate: {
                isIn: [
                    ['male', 'female']
                ]
            },
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

        fbUserId: {
            type: DataType.STRING(),
            unique: true,
        },
        isEmailVerified: {
            type: DataType.BOOLEAN(),
        }
    }, {
        classMethods: {
            associate: function(models) {
                // are we setting this to nationality?
                User.belongsTo(models.Country, {
                    as: "homeCountry"
                });

                User.belongsTo(models.University, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        as: 'homeUniversityId',
                        allowNull: false
                    }
                });

                User.belongsToMany(models.Exchange, {
                    as: 'exchangeEvent',
                    through: 'student_exchange',
                    foreignKey: 'userId'
                });

                User.belongsToMany(models.Event, {
                    as: 'event',
                    through: 'user_event',
                    foreignKey: 'userId'
                })

                User.belongsToMany(models.Group, {
                    as: 'group',
                    through: 'chat_group',
                    foreignKey: 'userId'
                });

                User.hasMany(models.ChatMessage);

                User.hasMany(models.Story);
            }
        },
        instanceMethods: {
            generateJwt: function() {
                var expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);

                return jwt.sign({
                    id: this.id,
                    email: this.email,
                    name: this.name,
                    profilePictureUrl: this.profilePictureUrl,
                    exp: parseInt(expiry.getTime() / 1000),
                }, config.secret);
            },
        }
    });

    return User;
};
