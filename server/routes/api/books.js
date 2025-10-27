// const express = require('express');
// const router = express.Router();
// const booksController = require('../../controllers/booksController');

// router.route('/').get(booksController.getAllBooks);

// router.route('/:id').delete(booksController.deleteBook);

// router.route('/addBook').post(booksController.createNewBook);

// router.route('/editBook/:id').put(booksController.updateBook);
// router.route('/editBook/:id').get(booksController.getBook);

// module.exports = router;

const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/booksController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'pdfFile') cb(null, path.join(__dirname, '../../uploads/pdfs'));
    else if (file.fieldname === 'coverImage') cb(null, path.join(__dirname, '../../uploads/covers'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.route('/')
  .get(booksController.getAllBooks);

router.route('/addBook')
  .post(upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), booksController.createNewBook);

router.route('/:id')
  .get(booksController.getBookById)
  .put(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;
