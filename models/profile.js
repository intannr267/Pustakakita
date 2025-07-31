"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: `First Name is required`,
          },
          notEmpty: {
            args: true,
            msg: `First Name is required`,
          },
        },
      },
      lastName: DataTypes.STRING,
      imageURL: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["male", "female"]],
            msg: `Choose your gender`,
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  Profile.addHook("beforeCreate", async (profile, options) => {
    if (profile.gender === "male") {
      profile.imageURL =
        "https://cdn-icons-png.flaticon.com/128/3135/3135715.png";
    }
    if (profile.gender === "female") {
      profile.imageURL =
        "https://cdn-icons-png.flaticon.com/128/6997/6997662.png";
    }
  });
  return Profile;
};
