const { User } = require("../models/index");

class Controller {
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
      res.render("login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveLogin(req, res) {
    try {
      res.send("X");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async home(req, res) {
    try {
      res.redirect("/register");
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
