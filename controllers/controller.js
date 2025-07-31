//const { returnDate } = require('../helpers/helper');
 const { Op } = require("sequelize");
const { Book, User, Profile, Category } = require("../models/index");
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
    const { title } = req.query;

    let options = {};

    if (title) {
      options.where = {
        title: {
          [Op.iLike]: `%${title}%` 
        }
      };
    }

    const books = await Book.findAll(options); 

    res.render("books", { books });
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
      include: [Book]
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
    const { title, description, author, pageCount, publisher, imageURL, isbn, CategoryId } = req.body;
    await Book.create({
      title,
      description,
      author,
      pageCount: Number(pageCount),
      publisher,
      imageURL,
      isbn,
      CategoryId: +CategoryId 
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
      include:[{
        model: Category
      }]
    });
    //const categories = await Category.findAll()

    if (!book) {
      throw 'Book is not found'
    }
    //res.send(categories);
    res.render("bookDetail", { book });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
static async deleteBookbyId(req, res) {
  try {
    const { id } = req.params;
    await Book.destroy({ where: { id } });
    res.redirect("/books");
  } catch (err) {
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
      // res.send(profile);
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
    const { bookId } = req.params;
    const userId = req.session.userId;
    const book = await Book.findByPk(bookId);
    if (book.isAvailable = false) {
      throw new Error("Out of stock");
    } 
    await Borrow.create({
      BookId: book.id,
      UserId: userId,
      borrowDate: new Date(),
      returnDate: null,
    });

    await book.update({
      isAvailable: false,
      UserId: userId
    });

    res.redirect("/books"); 
  } catch (err) {
    console.log(err);
    res.send(err.message || err);
  }
}

static async showInvoice(req, res) {
  try {
    const { borrowId } = req.params;

    const invoice = await Borrow.findByPk(borrowId, {
      include: [
        {
          model: Book,
          include: [Category]
        },
        {
          model: User
        }
      ]
    });

    res.render("invoice", { invoice });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

}

module.exports = Controller;
