// // import axios from 'axios';

// // const URL = 'http://localhost:8082';

// // export const getBooks = async () => {
// //   try {
// //     return await axios.get(`${URL}/books`);
// //   } catch (error) {
// //     console.log('Error while calling get books API', error);
// //   }
// // };

// // export const getBook = async (id) => {
// //   try {
// //     return await axios.get(`${URL}/books/editBook/${id}`);
// //   } catch (error) {
// //     console.log('Error while calling get book API', error);
// //   }
// // };

// // export const editBook = async (bookDetails) => {
// //   try {
// //     return await axios.put(`${URL}/books/editBook/${bookDetails.id}`, bookDetails);
// //   } catch (error) {
// //     console.log('Error while calling edit book API', error);
// //   }
// // };

// // export const addBook = async (title, author, bookPages, publishDate) => {
// //   try {
// //     const bookDetails = {
// //       title: title,
// //       author: author,
// //       bookPages: bookPages,
// //       publishDate: publishDate,
// //     };

// //     return await axios.post(`${URL}/books/addBook`, bookDetails);
// //   } catch (error) {
// //     console.log('Error while calling add book API', error);
// //   }
// // };

// // export const deleteBook = async (id) => {
// //   try {
// //     return await axios.delete(`${URL}/books/${id}`);
// //   } catch (error) {
// //     console.log('Error while calling delete book API', error);
// //   }
// // };


// import axios from 'axios';

// // Ganti port sesuai backend kamu
// const URL = 'http://localhost:8082'; // Port backend Express (yang terhubung ke XAMPP)

// // ====================== BOOKS ======================

// // Ambil semua buku
// export const getBooks = async () => {
//   try {
//     return await axios.get(`${URL}/books`);
//   } catch (error) {
//     console.error('❌ Error while calling getBooks API:', error);
//   }
// };

// // Ambil 1 buku berdasarkan ID
// export const getBook = async (id) => {
//   try {
//     return await axios.get(`${URL}/books/${id}`);
//   } catch (error) {
//     console.error('❌ Error while calling getBook API:', error);
//   }
// };

// // Tambah buku baru
// export const addBook = async (title, author, bookPages, publishDate) => {
//   try {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const bookDetails = {
//       title,
//       author,
//       bookPages,
//       publishDate,
//       user_id: user?.id, // simpan id user yang sedang login
//     };

//     return await axios.post(`${URL}/books`, bookDetails);
//   } catch (error) {
//     console.error('❌ Error while calling addBook API:', error);
//   }
// };

// // Edit buku
// export const editBook = async (bookDetails) => {
//   try {
//     return await axios.put(`${URL}/books/${bookDetails.id}`, bookDetails);
//   } catch (error) {
//     console.error('❌ Error while calling editBook API:', error);
//   }
// };

// // Hapus buku
// export const deleteBook = async (id) => {
//   try {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return await axios.delete(`${URL}/books/${id}`, {
//       data: { user_id: user?.id, role: user?.role },
//     });
//   } catch (error) {
//     console.error('❌ Error while calling deleteBook API:', error);
//   }
// };

// // ====================== AUTH ======================

// // Register user baru
// export const registerUser = async (username, password, role) => {
//   try {
//     return await axios.post(`${URL}/register`, { username, password, role });
//   } catch (error) {
//     console.error('❌ Error while calling register API:', error);
//   }
// };

// // Login user
// export const loginUser = async (username, password) => {
//   try {
//     return await axios.post(`${URL}/login`, { username, password });
//   } catch (error) {
//     console.error('❌ Error while calling login API:', error);
//   }
// };


import axios from 'axios';

const URL = 'http://localhost:8082';


export const getBooks = async (query) => {
  try {
    let url = `${URL}/books`;
    if (query) {
      url += `?search=${query}`;
    }
    return await axios.get(url);
  } catch (error) {
    console.error('❌ Error while calling getBooks API:', error);
    throw error;
  }
};

export const getBook = async (id) => {
  try {
    return await axios.get(`${URL}/books/${id}`);
  } catch (error) {
    console.error('❌ Error while calling getBook API:', error);
    throw error;
  }
};


export const addBook = async (formData) => {
  try {
    return await axios.post(`${URL}/books/addBook`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('❌ Error while calling addBook API:', error);
    throw error;
  }
};

export const editBook = async (bookDetails, userData) => {
  try {
    return await axios.put(`${URL}/books/${bookDetails.id}`, {
      details: bookDetails,
      user: userData
    });
  } catch (error) {
    console.error('❌ Error while calling editBook API:', error);
    throw error;
  }
};

export const deleteBook = async (id, userId, role) => {
  try {
    return await axios.delete(`${URL}/books/${id}`, {
      data: { user_id: userId, role: role },
    });
  } catch (error) {
    console.error('❌ Error while calling deleteBook API:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    return await axios.post(`${URL}/auth/register`, userData);
  } catch (error) {
    console.error('❌ Error while calling register API:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    return await axios.post(`${URL}/auth/login`, credentials);
  } catch (error) {
    console.error('❌ Error while calling login API:', error);
    throw error;
  }
};