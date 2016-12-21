'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Wiki = sequelize.define('Wiki', {
    title: {
      type: DataType.STRING(255),
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataType.STRING(1000),
    },

    view: {
      type: DataType.INTEGER(),
      defaultValue: 0,
    },

    wikiType: {
      type: DataType.STRING(50),
      validate: {
          isIn: [
              ['OpenToEdit', 'SemiProtected', 'Protected']
          ]
      },
      defaultValue: 'OpenToEdit',
    }
  }, {
    classMethods: {
      associate: function(models) {
        Wiki.belongsTo(models.University);
        Wiki.belongsTo(models.Country);
        Wiki.belongsTo(models.User, {
            onDelete: "CASCADE",
            as: "author"
        });

        Wiki.hasMany(models.WikiSection, {
            onDelete: "CASCADE"
        });
      }
    }
  });

  return Wiki;
};
