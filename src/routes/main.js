const express = require('express');
const mainController = require('../controllers/main');

const router = express.Router();

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register', mainController.register);
router.post('/users/register', mainController.processRegister);
router.get('/users/login', mainController.login);
router.post('/users/login', mainController.processLogin);
router.get('/users/logout', mainController.logout);
router.get('/books/:id', mainController.deleteBook);//aun no se como enviar peticion delet desde html
router.get('/books/edit/:id', mainController.edit);//aun no se como enviar peticiones put desde html
router.post('/books/edit/:id', mainController.processEdit);

module.exports = router;
