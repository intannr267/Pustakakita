const express = require("express");
const Controller = require("../controllers/controller.js");
const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    console.log(req.session);
    next();
  } else {
    let err = `You need to Login`;
    res.redirect(`/login?err=${err}`);
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.role === "admin") {
    console.log(req.session);
    next();
  } else {
    let err = `Admins only: Access restricted.`;
    res.redirect(`/?err=${err}`);
  }
};

//router.get("/", isLoggedIn, Controller.landingPage);
router.get("/", Controller.landingPage);
//router.get("/books", isLoggedIn, isAdmin, Controller.readBook);
router.get("/books", Controller.readBook);
router.get('/books/add',isLoggedIn,isAdmin, Controller.showAddBookForm);
router.post('/books/add', Controller.saveAddBook);
router.get("/register", Controller.showRegister);
router.post("/register", Controller.saveRegister);

router.get("/login", Controller.showLogin);
router.post("/login", Controller.saveLogin);
router.get("/logout", Controller.logout);
router.get("/categories", Controller.allCategories);
router.get("/generate-invoice", isLoggedIn, Controller.generateInvoice);
router.get("/invoices", isLoggedIn, Controller.showInvoice);
router.get("/profile/:id", Controller.showEditProfile);
router.post("/profile/:id", Controller.saveEditProfile);
router.get("/categories/:categoryId/books", Controller.showBooksByCategory);
router.get("/books/:bookId", Controller.showBookDetail);
router.get("/books/:booksId/borrow", isLoggedIn, Controller.borrowBook);
router.get("/invoices/:id", isLoggedIn, Controller.invoiceQr);// u/ generate QR
router.get("/invoice/:id/show", Controller.invoiceDetail);// untuk nampilin invoice  aja
router.get("/books/:id/delete", Controller.deleteBookbyId);

module.exports = router;
