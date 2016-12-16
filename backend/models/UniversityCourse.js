'use strict';

module.exports = function(sequelize, DataType){
    var UniversityCourse = sequelize.define("UniversityCourse", {

    }, {
        classMethods: {
            associate: function(models){

            }
        }
    })
    return UniversityCourse;
}
