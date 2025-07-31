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

router.get("/", isLoggedIn, Controller.landingPage);
router.get("/books", isLoggedIn, isAdmin, Controller.readBook);
// router.get('/books/add', Controller.X);
// router.post('/books/add', Controller.X);
router.get("/register", Controller.showRegister);
router.post("/register", Controller.saveRegister);

router.get("/login", Controller.showLogin);
router.post("/login", Controller.saveLogin);
// router.get("/books/add", Controller.X);
// router.post("/books/add", Controller.X);

// router.get('/books/:booksId/user/add', Controller.X);
// router.post('/books/:booksId/user/add', Controller.X);
// router.get('/stores/:storeId/employeeId/edit', Controller.X);
// router.post('/stores/:storeId/employeeId/edit', Controller.X);
// router.get('/stores/:storeId/employees/:employeeId/delete', Controller.X);
// router.get('/employees', Controller.stores);
module.exports = router;
