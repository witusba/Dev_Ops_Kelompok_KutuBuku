// // const db = require('../config/db');
// // const bcrypt = require('bcryptjs');

// // // Register
// // exports.register = async (req, res) => {
// //   const { username, password, role } = req.body;

// //   if (!username || !password) return res.status(400).json({ message: 'Isi semua kolom!' });

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   db.query(
// //     'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
// //     [username, hashedPassword, role || 'user'],
// //     (err) => {
// //       if (err) return res.status(500).json({ message: 'Gagal register', error: err });
// //       res.status(201).json({ message: 'Registrasi berhasil!' });
// //     }
// //   );
// // };

// // // Login
// // exports.login = (req, res) => {
// //   const { username, password } = req.body;

// //   db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
// //     if (err) return res.status(500).json({ message: 'Error saat login' });
// //     if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

// //     const user = results[0];
// //     const match = await bcrypt.compare(password, user.password);
// //     if (!match) return res.status(401).json({ message: 'Password salah' });

// //     res.status(200).json({
// //       message: 'Login berhasil',
// //       user: {
// //         id: user.id,
// //         username: user.username,
// //         role: user.role,
// //       },
// //     });
// //   });
// // };

// const db = require('../config/db');
// const bcrypt = require('bcryptjs');

// // Register
// exports.register = async (req, res) => {
//   const { email, password, role } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ message: 'Isi semua kolom!' });

//   const hashedPassword = await bcrypt.hash(password, 10);

//   db.query(
//     'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
//     [email, hashedPassword, role || 'user'],
//     (err) => {
//       if (err)
//         return res
//           .status(500)
//           .json({ message: 'Gagal register', error: err });
//       res.status(201).json({ message: 'Registrasi berhasil!' });
//     }
//   );
// };

// // Login
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error saat login' });
//     if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

//     const user = results[0];
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ message: 'Password salah' });

//     res.status(200).json({
//       message: 'Login berhasil',
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   });
// };


const db = require('../config/db');
const bcrypt = require('bcryptjs');

//register
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'Username, Email, dan Password wajib diisi' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    const params = [username, email, hashedPassword, (role || 'user').toLowerCase()];

    db.query(sql, params, (err) => {
      if (err) {
        console.error("Database Insert Error:", err.message);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email atau username sudah terdaftar.' });
        }
        return res.status(500).json({ message: 'Gagal register', error: err.message });
      }
      res.status(201).json({ message: 'Registrasi berhasil!' });
    });
  } catch (hashError) {
    console.error("Bcrypt Hash Error:", hashError);
    return res.status(500).json({ message: 'Terjadi masalah saat memproses password.' });
  }
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error saat login' });
    if (results.length === 0) return res.status(404).json({ message: 'Email tidak ditemukan' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Password salah' });

    res.status(200).json({
      message: 'Login berhasil',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  });
};
