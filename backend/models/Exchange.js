'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var Exchange = sequelize.define('Exchange', {
        year: {
            type: DataType.INTEGER(4),
        },
        month: {
            type: DataType.ENUM('JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'),
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
                    through: 'StudentExchange',
                    foreignKey: 'exchangeId'
                });
            }
        }
    });

    return Exchange;
};
