// controllers/Controller.js
const { Book } = require('../models');

class Controller {
    static async landingPage(req, res) {
    try {

      res.render('landingPage');
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  }
  static async readBook(req, res) {
    try {
      const books = await Book.findAll();
      res.render('books', { books });
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  }
}

module.exports = Controller;
