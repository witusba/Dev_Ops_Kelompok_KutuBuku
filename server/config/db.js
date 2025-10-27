const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // password yang pas di XAMPP
  database: 'book_db'
});

// const db = mysql.createConnection({
//   host: process.env.DB_HOST, // Akan membaca 'db' dari docker-compose
//   user: process.env.DB_USER, // Akan membaca 'root'
//   password: process.env.DB_PASSWORD, // Akan membaca 'your_strong_password'
//   database: process.env.DB_NAME // Akan membaca 'book_db'
// });

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

module.exports = db;
