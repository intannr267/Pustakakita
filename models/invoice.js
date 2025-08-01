'use strict';
const {
  Model
} = require('sequelize');
  const { formatDate } = require('../helpers/helper');
//const { borrowBook } = require('../controllers/controller');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.User)
      Invoice.hasMany(models.Borrow)
    }

  get formattedInvoiceDate() {
  return formatDate(this.invoiceDate);
}

  }
  Invoice.init({
    invoiceDate: DataTypes.DATE,
    qrCodeURL: DataTypes.STRING,
    UserId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Invoice',
  });
  Invoice.addHook("afterCreate", async (invoice, options) => {
    invoice.qrCodeURL = `/invoice/${invoice.id}/show`
    await invoice.save()
  });
  return Invoice;
};