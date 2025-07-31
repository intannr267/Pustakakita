'use strict';
const fs = require('fs').promises
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

    
    let bookCategories = JSON.parse (await fs.readFile('./data/bookCategories.json','utf-8'))
    bookCategories = bookCategories.map(e=>{
      e.createdAt = e.updatedAt = new Date()
      return e
    })
       await queryInterface.bulkInsert('BookCategories', bookCategories
      , {});
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('BookCategories', null, {});
  }
};
