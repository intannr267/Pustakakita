"use strict";
const { returnDate } = require("../helpers/helper");
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
  
      formattedBorrowDate() {
        return new Date(this.borrowDate).toLocaleDateString("id-ID");
      }
      formattedReturnDate() {
        return new Date(this.returnDate).toLocaleDateString("id-ID");
      }
}
  Borrow.init(
    {
      BookId: DataTypes.INTEGER,
      loanDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      InvoiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Borrow",
    }
  );
  return Borrow;
};
