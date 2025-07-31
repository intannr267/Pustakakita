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
      Book.belongsToMany(models.Category, { through: "BookCategories" });
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title cannot be null" }
        }
      },

      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "ISBN is required" },
          notNull: { msg: "ISBN cannot be null" },
          len: {
            args: [1, 20],
            msg: "ISBN must be between 1 and 20 characters"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description is required" },
          notNull: { msg: "Description cannot be null" },
          len: {
            args: [10],
            msg: "Description must be at least 10 characters"
          }
        }
      },
      pageCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Page count is required" },
          isInt: { msg: "Page count must be an integer" },
          min: {
            args: [1],
            msg: "Page count must be at least 1"
          }
        }
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Publisher is required" },
          notNull: { msg: "Publisher cannot be null" }
        }
      },
      imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image URL is required" },
          notNull: { msg: "Image URL cannot be null" },
          isUrl: { msg: "Image URL must be a valid URL" }
        }
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId is required" },
          isInt: { msg: "UserId must be an integer" }
        }
      }
    },
    {
      sequelize,
      modelName: "Book",
    }

  );
  return Book;
};
