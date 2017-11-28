'use strict';

module.exports = function(sequelize, DataType){
    var UniversityCourse = sequelize.define("UniversityCourse", {
        name: {
            type: DataType.STRING(),
            allowNull: false,
        },

        department: {
            type: DataType.STRING(),

        },

        
    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return UniversityCourse;
}
