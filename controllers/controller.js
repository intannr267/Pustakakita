// controllers/Controller.js
const {
  Book,
  User,
  Profile,
  Category,
  Borrow,
  Invoice,
} = require("../models/index");
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
      let trigger = await Borrow.findOne({ where: { InvoiceId: null } });
      const books = await Book.findAll();
      // res.send(books);
      res.render("books", { books, trigger });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async allCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("categories", { categories });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async showBooksByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByPk(categoryId, {
        include: [Book],
      });

      if (!category) throw "Category not found";

      res.render("booksByCategory", { category });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showAddBookForm(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("addBook", { categories });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async saveAddBook(req, res) {
    try {
      const {
        title,
        description,
        author,
        pageCount,
        publisher,
        imageURL,
        isbn,
        CategoryId,
      } = req.body;
      await Book.create({
        title,
        description,
        author,
        pageCount: Number(pageCount),
        publisher,
        imageURL,
        isbn,
        CategoryId: +CategoryId,
      });

      res.redirect("/books");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async showBookDetail(req, res) {
    try {
      const { bookId } = req.params;
      const book = await Book.findByPk(bookId, {
        include: [
          {
            model: Category,
          },
        ],
      });
      //const categories = await Category.findAll()

      if (!book) {
        throw "Book is not found";
      }
      //res.send(categories);
      res.render("bookDetail", { book });
    } catch (error) {
      console.log(error);
      res.send(error);
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
      let { firstName, lastName, gender } = req.body;
      let user = await User.create({ email, password, role });
      await Profile.create({ firstName, lastName, gender, UserId: user.id });

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

  static async showEditProfile(req, res) {
    try {
      let { id } = req.params;
      let genders = ["male", "female"];
      let profile = await Profile.findByPk(+id);
      res.render("edit-profile", { profile, genders });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveEditProfile(req, res) {
    try {
      let { id } = req.params;
      let { firstName, lastName, gender, imageURL } = req.body;
      let profile = await Profile.update(
        { firstName, lastName, gender, imageURL },
        {
          where: {
            id: +id,
          },
        }
      );
      res.redirect(`/profile/${id}`);
      // res.send(req.params);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async borrowBook(req, res) {
    try {
      let { booksId } = req.params;
      await Borrow.create({
        BookId: +booksId,
      });
      await Book.update(
        { isAvailable: false, UserId: req.session.userId },
        {
          where: {
            id: +booksId,
          },
        }
      );

      // res.send("X");
      res.redirect("/books");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async generateInvoice(req, res) {
    try {
      let invoice = await Invoice.create({
        invoiceDate: new Date(),
        UserId: req.session.userId,
      });
      await Borrow.update(
        { InvoiceId: +invoice.id },
        {
          where: {
            InvoiceId: null,
          },
        }
      );
      // res.send(req.session.id);
      res.redirect("/books");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getInvoices(req, res) {
    try {
      res.send("X");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async invoiceQr(req, res) {
    try {
      res.send("X");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showInvoice(req, res) {
    try {
      res.send("X");
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
