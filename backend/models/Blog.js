'use strict';
var config = require('../config/config');

module.exports = function(sequelize, DataType) {
  var Blog = sequelize.define('Blog', {
    /*
      haven't think of a easy way to store blogs
      possible solutions refer to :
        embed with iframe??? -> store as static site and access via url only (not idea enough)
        http://typecho.org/ 
        https://hexo.io/
    */

  }, {
    classMethods: {
      associate: function(models) {
        Blog.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Blog;
};
