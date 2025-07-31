"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      isbn: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      pageCount: {
        type: Sequelize.INTEGER,
      },
      publisher: {
        type: Sequelize.STRING,
      },
      imageURL: {
        type: Sequelize.STRING,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Books");
  },
};
