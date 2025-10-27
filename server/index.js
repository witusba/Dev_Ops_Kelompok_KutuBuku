// // const express = require('express');
// // const app = express();
// // const cors = require('cors');
// // const corsOptions = require('./config/corsOptions');
// // const PORT = process.env.PORT || 8082;

// // //Cross Origin Resource Sharing
// // app.use(cors(corsOptions));

// // //built-in middleware to handle url encoded data
// // //data which user enters in a form
// // app.use(express.urlencoded({ extended: false }));

// // //built-in middleware for json data
// // app.use(express.json());

// // //Routes
// // app.use('/books', require('./routes/api/books'));

// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// const db = require('./config/db');
// const PORT = process.env.PORT || 8082;

// app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Routes
// app.use('/books', require('./routes/api/books'));
// app.use('/auth', require('./routes/api/auth')); // baru

// // Tes koneksi database
// db.connect(err => {
//   if (err) throw err;
//   console.log('MySQL Connected!');
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const db = require('./config/db');
const PORT = process.env.PORT || 8082;

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
  console.log('✅ MySQL Connected!');
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/books', require('./routes/api/books'));
app.use('/auth', require('./routes/api/auth'));
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
