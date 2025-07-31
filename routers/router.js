const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/register", Controller.showRegister);
router.post("/register", Controller.saveRegister);

router.get("/login", Controller.showLogin);
router.post("/login", Controller.saveLogin);

router.get("/", Controller.home);
router.get("/books", Controller.X);
router.get("/books/add", Controller.X);
router.post("/books/add", Controller.X);

// router.get('/books/:booksId/user/add', Controller.X);
// router.post('/books/:booksId/user/add', Controller.X);
// router.get('/stores/:storeId/employeeId/edit', Controller.X);
// router.post('/stores/:storeId/employeeId/edit', Controller.X);
// router.get('/stores/:storeId/employees/:employeeId/delete', Controller.X);
// router.get('/employees', Controller.stores);
module.exports = router;
