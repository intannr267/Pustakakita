'use strict';
const fs = require('fs').promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      let books = JSON.parse(await fs.readFile('./data/books.json', 'utf-8'));

    books = books.map(el => {
      el.createdAt = el.updatedAt = new Date();

      return el;
    })

    await queryInterface.bulkInsert('Books', books, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
