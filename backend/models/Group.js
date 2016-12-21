'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var Group = sequelize.define('Group', {
        /*
        default three type of groups have unique name:
        0: exchange university name + " exchange students -- Year " + year + " " + semester
        1: home university name + " going abroad -- Year  " + year + " " + semester
        2: home university name + " students in " + exchange university name
        */
        name: {
            type: DataType.STRING(255),
            allowNull: false
        },
        /*
        groupType attribute is currently restricted to 3 default groups
        0: default group of same exchange university, same year, same semester
        1: default group of same home university, same year, same semester
        2: default group of same home university, same exchange university
        */
        groupType: {
            type: DataType.INTEGER(2),
            min: 0,
            max: 10,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Group.belongsToMany(models.User, {
                    as: 'user',
                    through: 'UserGroup',
                    foreignKey: 'groupId'
                });

                Group.hasMany(models.FeedPost, {
                    onDelete: "CASCADE"
                })

            }
        }
    });

    return Group;
};
