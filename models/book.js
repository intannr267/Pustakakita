"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Book.belongsTo(models.User);
      Book.hasOne(models.Borrow);
      Book.belongsToMany(models.Category, { through: 'BookCategories' });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      isbn: DataTypes.STRING,
      description: DataTypes.STRING,
      pageCount: DataTypes.INTEGER,
      publisher: DataTypes.STRING,
      imageURL: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
