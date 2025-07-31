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
router.get("/books/add", Controller.showAddBookForm);
router.post("/books/add", Controller.saveAddBook);
router.get("/register", Controller.showRegister);
router.post("/register", Controller.saveRegister);

router.get("/login", Controller.showLogin);
router.post("/login", Controller.saveLogin);
router.get("/categories", Controller.allCategories);
router.get("/generate-invoice", isLoggedIn, Controller.generateInvoice);
router.get("/invoice", isLoggedIn, Controller.getInvoices);
router.get("/profile/:id", Controller.showEditProfile);
router.post("/profile/:id", Controller.saveEditProfile);
// router.post("/books/add", Controller.X);
router.get("/categories/:categoryId/books", Controller.showBooksByCategory);
router.get("/books/:bookId", Controller.showBookDetail);

router.get("/books/:booksId/borrow", isLoggedIn, Controller.borrowBook);
// router.get("/books/:booksId/borrow", Controller.borrowBook);
router.get("/invoice/:id", isLoggedIn, Controller.invoiceQr);
router.get("/invoice/:id/show", isLoggedIn, Controller.showInvoice);
router.get('/books/:id/delete', Controller.deleteBookbyId);
// router.get('/stores/:storeId/employeeId/edit', Controller.X);
// router.post('/stores/:storeId/employeeId/edit', Controller.X);
// router.get('/stores/:storeId/employees/:employeeId/delete', Controller.X);
// router.get('/employees', Controller.stores);
module.exports = router;
