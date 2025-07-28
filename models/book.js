'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING,
    isbn: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    publishedDate: DataTypes.DATEONLY,
    thumbnailUrl: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    longDescription: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};