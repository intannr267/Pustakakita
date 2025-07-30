const express = require('express')
const Controller = require('../controllers/controller.js');
const router = express.Router()

 router.get('/', Controller.landingPage);
router.get('/books', Controller.readBook);
// router.get('/books/add', Controller.X);
// router.post('/books/add', Controller.X);

// router.get('/books/:booksId/user/add', Controller.X); 
// router.post('/books/:booksId/user/add', Controller.X); 
// router.get('/stores/:storeId/employeeId/edit', Controller.X); 
// router.post('/stores/:storeId/employeeId/edit', Controller.X); 
// router.get('/stores/:storeId/employees/:employeeId/delete', Controller.X); 
// router.get('/employees', Controller.stores);
module.exports = router;