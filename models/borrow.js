"use strict";
const { borrowBook,returnDate } = require("../helpers/helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.belongsTo(models.Invoice);
      Borrow.belongsTo(models.Book);
    }
    get generatedBorrowDate() {
      return borrowBook();
    }

  
    get generatedReturnDate() {
      return returnDate();
    }

  }

  Borrow.init(
    {
      BookId: DataTypes.INTEGER,
      loanDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      InvoiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Borrow",
    }
  );
  Borrow.addHook("beforeCreate", async (borrow, options) => {
    borrow.loanDate = new Date();

    const returnDate = new Date(borrow.loanDate);
    returnDate.setDate(returnDate.getDate() + 7);

    borrow.returnDate = returnDate;
  });
  return Borrow;
};
