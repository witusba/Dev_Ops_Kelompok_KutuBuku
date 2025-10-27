// // const data = {
// //   books: require('../model/books.json'),
// //   setBooks: function (data) {
// //     this.books = data;
// //   },
// // };

// // const fsPromises = require('fs').promises;
// // const path = require('path');

// // const getAllBooks = (req, res) => {
// //   res.json(data.books);
// // };

// // const getBook = (req, res) => {
// //   const book = data.books.find((bk) => bk.id === parseInt(req.params.id));
// //   if (!book) {
// //     return res.json({ message: `Book ID ${req.params.id} not found!` });
// //   }

// //   res.json(book);
// // };

// // const createNewBook = async (req, res) => {
// //   const newBook = {
// //     id: data.books?.length ? data.books[data.books.length - 1].id + 1 : 1,
// //     title: req.body.title,
// //     author: req.body.author,
// //     no_of_pages: parseInt(req.body.bookPages),
// //     published_at: req.body.publishDate,
// //   };

// //   if (!newBook.title || !newBook.author || !newBook.no_of_pages || !newBook.published_at) {
// //     return res.json({ message: 'Please enter all required details!' });
// //   }

// //   data.setBooks([...data.books, newBook]);
// //   await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'books.json'), JSON.stringify(data.books));
// //   res.status(201).json({ message: 'Book added!' });
// // };

// // const updateBook = async (req, res) => {
// //   const updatedBook = data.books.find((bk) => bk.id === parseInt(req.body.id));
// //   console.log(req.body);

// //   if (!updatedBook) {
// //     return res.json({ message: `Book ID ${req.body.id} not found` });
// //   }

// //   if (!req.body.title || !req.body.author || !req.body.no_of_pages || !req.body.published_at) {
// //     return res.json({ message: 'Please do not leave empty fields!' });
// //   }

// //   if (req.body.title) updatedBook.title = req.body.title;
// //   if (req.body.author) updatedBook.author = req.body.author;
// //   if (req.body.no_of_pages) updatedBook.no_of_pages = parseInt(req.body.no_of_pages);
// //   if (req.body.published_at) updatedBook.published_at = req.body.published_at;

// //   const filteredArray = data.books.filter((bk) => bk.id !== parseInt(req.body.id));
// //   const unsortedArray = [...filteredArray, updatedBook];

// //   data.setBooks(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));
// //   await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'books.json'), JSON.stringify(data.books));
// //   res.json({ message: 'Book updated!' });
// // };

// // const deleteBook = async (req, res) => {
// //   const book = data.books.find((bk) => bk.id === parseInt(req.params.id));
// //   if (!book) {
// //     return res.json({ message: `Book ID ${req.params.id} not found` });
// //   }
// //   const filteredArray = data.books.filter((bk) => bk.id !== parseInt(req.params.id));
// //   data.setBooks([...filteredArray]);
// //   await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'books.json'), JSON.stringify(data.books));
// //   res.json({ message: 'Book deleted!' });
// // };

// // module.exports = { getAllBooks, getBook, createNewBook, updateBook, deleteBook };

// const db = require('../config/db'); // koneksi MySQL dari file db.js

// // GET semua buku
// const getAllBooks = (req, res) => {
//   db.query('SELECT * FROM books', (err, results) => {
//     if (err) return res.status(500).json({ message: 'Database error', error: err });
//     res.json(results);
//   });
// };

// // GET satu buku berdasarkan ID
// const getBook = (req, res) => {
//   const { id } = req.params;
//   db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Database error', error: err });
//     if (results.length === 0) return res.json({ message: `Book ID ${id} not found!` });
//     res.json(results[0]);
//   });
// };

// // POST tambah buku baru
// const createNewBook = (req, res) => {
//   const { title, author, bookPages, publishDate } = req.body;

//   if (!title || !author || !bookPages || !publishDate) {
//     return res.json({ message: 'Please enter all required details!' });
//   }

//   const sql = 'INSERT INTO books (title, author, no_of_pages, published_at) VALUES (?, ?, ?, ?)';
//   db.query(sql, [title, author, bookPages, publishDate], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error', error: err });
//     res.status(201).json({ message: 'Book added!' });
//   });
// };

// // PUT update buku
// const updateBook = (req, res) => {
//   const { id } = req.params;
//   const { title, author, no_of_pages, published_at } = req.body;

//   if (!title || !author || !no_of_pages || !published_at) {
//     return res.json({ message: 'Please do not leave empty fields!' });
//   }

//   const sql = `
//     UPDATE books 
//     SET title = ?, author = ?, no_of_pages = ?, published_at = ? 
//     WHERE id = ?
//   `;

//   db.query(sql, [title, author, no_of_pages, published_at, id], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error', error: err });
//     if (result.affectedRows === 0) return res.json({ message: `Book ID ${id} not found` });
//     res.json({ message: 'Book updated!' });
//   });
// };

// // DELETE hapus buku
// const deleteBook = (req, res) => {
//   const { id } = req.params;

//   db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error', error: err });
//     if (result.affectedRows === 0) return res.json({ message: `Book ID ${id} not found` });
//     res.json({ message: 'Book deleted!' });
//   });
// };

// module.exports = {
//   getAllBooks,
//   getBook,
//   createNewBook,
//   updateBook,
//   deleteBook
// };

const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.getAllBooks = (req, res) => {
  const { search } = req.query;
  let sql = `
    SELECT 
      books.*, 
      users.username AS owner_username 
    FROM books 
    LEFT JOIN users ON books.uploaded_by = users.id
  `;
  const params = [];
  if (search) {
    sql += ' WHERE books.title LIKE ?';
    params.push(`%${search}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getBookById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      books.*, 
      users.username AS owner_username 
    FROM books 
    LEFT JOIN users ON books.uploaded_by = users.id
    WHERE books.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(results[0]);
  });
};

// Add buku baru
exports.createNewBook = (req, res) => {
  const { title, author, no_of_pages, published_at, uploaded_by } = req.body;
  const pdfFile = req.files?.pdfFile ? `/uploads/pdfs/${req.files.pdfFile[0].filename}` : null;
  const coverImage = req.files?.coverImage ? `/uploads/covers/${req.files.coverImage[0].filename}` : null;

  if (!title || !author || !no_of_pages || !published_at || !uploaded_by || !pdfFile || !coverImage) {
    return res.status(400).json({ message: 'Lengkapi semua kolom termasuk file!' });
  }

  const sql = `INSERT INTO books (title, author, no_of_pages, published_at, pdf_link, cover_image, uploaded_by) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, author, no_of_pages, published_at, pdfFile, coverImage, uploaded_by], (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Book added successfully', id: result.insertId });
  });
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { details, user } = req.body;
  if (!details || !user) {
    return res.status(400).json({ message: 'Data update tidak lengkap.' });
  }

  const { title, author, no_of_pages, published_at } = details;
  const { user_id, role } = user;

  if (!title || !author || !no_of_pages || !published_at) {
    return res.status(400).json({ message: 'Semua kolom teks wajib diisi.' });
  }
  if (!user_id || !role) {
    return res.status(401).json({ message: 'Informasi otorisasi tidak ada.' });
  }

  db.query('SELECT uploaded_by FROM books WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Book not found' });

    const book = results[0];
    if (role !== 'admin' && book.uploaded_by !== user_id) {
      return res.status(403).json({ message: 'Akses ditolak: Anda bukan pemilik buku ini.' });
    }

    const sql = `
      UPDATE books 
      SET title = ?, author = ?, no_of_pages = ?, published_at = ? 
      WHERE id = ?
    `;
    const params = [title, author, no_of_pages, published_at, id];

    db.query(sql, params, (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Buku tidak ditemukan saat update.' });
      res.json({ message: 'Buku berhasil diperbarui.' });
    });
  });
};

// delete book + hapus filenya juga
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const { user_id, role } = req.body;

  if (!user_id || !role) {
    return res.status(401).json({ message: 'Informasi otorisasi tidak ada.' });
  }

  db.query('SELECT pdf_link, cover_image, uploaded_by FROM books WHERE id=?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Book not found' });

    const book = results[0];

    if (role !== 'admin' && book.uploaded_by !== user_id) {
      return res.status(403).json({ message: 'Akses ditolak: Anda bukan pemilik buku ini.' });
    }

    if (book.pdf_link) fs.unlink(path.join(__dirname, '..', '..', book.pdf_link), () => { });
    if (book.cover_image) fs.unlink(path.join(__dirname, '..', '..', book.cover_image), () => { });

    db.query('DELETE FROM books WHERE id=?', [id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: 'Book deleted successfully' });
    });
  });
};
