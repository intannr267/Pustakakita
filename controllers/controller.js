// controllers/Controller.js
const { Book, User } = require("../models/index");
const bcrypt = require("bcryptjs");

class Controller {
  static async landingPage(req, res) {
    try {
      res.render("landingPage");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async readBook(req, res) {
    try {
      const books = await Book.findAll();
      res.render("books", { books });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async showRegister(req, res) {
    try {
      let { errors } = req.query;
      if (errors) {
        errors = errors.split(",");
      }
      //   res.send(errors);
      res.render("register", { errors });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveRegister(req, res) {
    try {
      let { email, password, role } = req.body;
      await User.create({ email, password, role });
      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((val) => {
          return val.message;
        });
        res.redirect(`/register?errors=${errors}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async showLogin(req, res) {
    try {
      let { err } = req.query;
      // res.send(err);
      res.render("login", { err });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveLogin(req, res) {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ where: { email: email } });

      if (!user) {
        let err = `User with email ${email} not found`;
        res.redirect(`/login?err=${err}`);
      }

      let valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        let err = `Incorrect password`;
        res.redirect(`/login?err=${err}`);
      }

      req.session.userId = user.id;
      req.session.role = user.role;

      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async X(req, res) {
    try {
      res.send("X");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
