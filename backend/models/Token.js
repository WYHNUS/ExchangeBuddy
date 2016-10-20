'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
    var Token = sequelize.define("Token", {
        token: {
            type: DataType.UUID(),
            defaultValue: DataType.UUIDV4()
        }
    }, {
        classMethods: {
            associate: function(models){
                Token.belongsTo(models.User,{
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    })

    return Token;
}
