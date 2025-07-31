"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Invoice);
      User.hasMany(models.Book);
    }
  }
  User.init(
    {
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `Password is required`,
          },
          notEmpty: {
            args: true,
            msg: `Password is required`,
          },
          len: {
            args: [8, 50],
            msg: `Password minimum length is 8`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["guest", "admin"]],
            msg: `Choose your role`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            args: true,
            msg: `Email is required`,
          },
          notEmpty: {
            args: true,
            msg: `Email is required`,
          },
          isEmail: {
            args: true,
            msg: `Invalid input. Ex: foo@bar.com`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    // console.log(hash);
    user.password = hash;
  });
  return User;
};
