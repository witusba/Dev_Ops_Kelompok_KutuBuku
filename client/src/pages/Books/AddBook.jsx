// // // import React from 'react';
// // // import { addBook } from '../../service/api';
// // // import './addBook.css';
// // // import 'animate.css';

// // // const AddBook = () => {
// // //   let title = '';
// // //   let author = '';
// // //   let bookPages = 0;
// // //   let publishDate = '';

// // //   const updateTitle = (e) => {
// // //     title = e.target.value;
// // //   };
// // //   const updateAuthor = (e) => {
// // //     author = e.target.value;
// // //   };
// // //   const updateBookPages = (e) => {
// // //     bookPages = e.target.value;
// // //   };
// // //   const updatePublishDate = (e) => {
// // //     publishDate = e.target.value;
// // //   };

// // //   const addNewBook = async () => {
// // //     const response = await addBook(title, author, bookPages, publishDate);
// // //     document.querySelector('.modal-text').textContent = response.data.message;
// // //     document.querySelector('.modal').classList.toggle('hide-modal');
// // //   };

// // //   const closeModal = () => {
// // //     document.querySelector('.modal').classList.toggle('hide-modal');
// // //   };
// // //   return (
// // //     <section>
// // //       <div className='form-container animate__animated animate__backInDown'>
// // //         <div className='modal hide-modal animate__animated animate__tada'>
// // //           <button className='close-btn' onClick={closeModal}>
// // //             X
// // //           </button>
// // //           <p className='modal-text'></p>
// // //           <a href='/books'>
// // //             <button className='nav-back-btn'>Back to Collection</button>
// // //           </a>
// // //         </div>
// // //         <div className='add-book-form'>
// // //           <h1>Add a new book.</h1>
// // //           <div className='input-container'>
// // //             <label>Title: </label>
// // //             <input type='text' name='title' id='title' placeholder='Title' onChange={(e) => updateTitle(e)} required />
// // //           </div>
// // //           <div className='input-container'>
// // //             <label>Author: </label>
// // //             <input type='text' name='author' id='author' placeholder='Author' onChange={(e) => updateAuthor(e)} required />
// // //           </div>
// // //           <div className='input-container'>
// // //             <label># of Pages: </label>
// // //             <input type='number' name='no_of_pages' id='no_of_pages' placeholder='Total Pages' onChange={(e) => updateBookPages(e)} required />
// // //           </div>
// // //           <div className='input-container'>
// // //             <label>Date Published: </label>
// // //             <input type='date' name='publish_date' id='publish_date' onChange={(e) => updatePublishDate(e)} required />
// // //           </div>
// // //           <button className='addBook-btn' onClick={addNewBook}>
// // //             Add Book
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default AddBook;


// // import React from 'react';
// // import { addBook } from '../../service/api';
// // import './addBook.css';
// // import 'animate.css';

// // const AddBook = () => {
// //   let title = '';
// //   let author = '';
// //   let bookPages = 0;
// //   let publishDate = '';

// //   const updateTitle = (e) => (title = e.target.value);
// //   const updateAuthor = (e) => (author = e.target.value);
// //   const updateBookPages = (e) => (bookPages = e.target.value);
// //   const updatePublishDate = (e) => (publishDate = e.target.value);

// //   const addNewBook = async () => {
// //     const user = JSON.parse(localStorage.getItem('user'));
// //     if (!user) {
// //       alert('Anda harus login terlebih dahulu');
// //       window.location.href = '/login';
// //       return;
// //     }

// //     const response = await addBook({
// //       title,
// //       author,
// //       no_of_pages: bookPages,
// //       publish_date: publishDate,
// //       owner: user.username, // simpan username sebagai pemilik buku
// //     });

// //     document.querySelector('.modal-text').textContent = response.data.message;
// //     document.querySelector('.modal').classList.toggle('hide-modal');
// //   };

// //   const closeModal = () => {
// //     document.querySelector('.modal').classList.toggle('hide-modal');
// //   };

// //   return (
// //     <section>
// //       <div className='form-container animate__animated animate__backInDown'>
// //         <div className='modal hide-modal animate__animated animate__tada'>
// //           <button className='close-btn' onClick={closeModal}>X</button>
// //           <p className='modal-text'></p>
// //           <a href='/books'><button className='nav-back-btn'>Back to Collection</button></a>
// //         </div>

// //         <div className='add-book-form'>
// //           <h1>Add a new book.</h1>
// //           <div className='input-container'>
// //             <label>Title: </label>
// //             <input type='text' onChange={updateTitle} placeholder='Title' required />
// //           </div>
// //           <div className='input-container'>
// //             <label>Author: </label>
// //             <input type='text' onChange={updateAuthor} placeholder='Author' required />
// //           </div>
// //           <div className='input-container'>
// //             <label># of Pages: </label>
// //             <input type='number' onChange={updateBookPages} placeholder='Total Pages' required />
// //           </div>
// //           <div className='input-container'>
// //             <label>Date Published: </label>
// //             <input type='date' onChange={updatePublishDate} required />
// //           </div>
// //           <button className='addBook-btn' onClick={addNewBook}>Add Book</button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default AddBook;

// import React, { useState } from 'react'; // 1. Import useState
// import { addBook } from '../../service/api';
// import './addBook.css';
// import 'animate.css';

// const AddBook = () => {
//   // 2. Ganti variabel 'let' dengan satu state object
//   const [form, setForm] = useState({
//     title: '',
//     author: '',
//     bookPages: 0,
//     publishDate: '',
//   });

//   // 3. Buat satu handler untuk semua input
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const addNewBook = async () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//       alert('Anda harus login terlebih dahulu');
//       window.location.href = '/login';
//       return;
//     }

//     // 4. Tambahkan try...catch untuk menangani error
//     try {
//       // 5. Ambil data dari state 'form'
//       const response = await addBook({
//         title: form.title,
//         author: form.author,
//         no_of_pages: form.bookPages,
//         publish_date: form.publishDate,
//         owner: user.username, // simpan username sebagai pemilik buku
//       });

//       document.querySelector('.modal-text').textContent = response.data.message;
//       document.querySelector('.modal').classList.toggle('hide-modal');

//       // Kosongkan form setelah berhasil
//       setForm({
//         title: '',
//         author: '',
//         bookPages: 0,
//         publishDate: '',
//       });

//     } catch (err) {
//       // 6. Tampilkan pesan error jika gagal
//       console.error(err);
//       alert('Gagal menambah buku: ' + (err.response?.data?.message || err.message));
//     }
//   };

//   // Fungsi ini sudah benar
//   const closeModal = () => {
//     document.querySelector('.modal').classList.toggle('hide-modal');
//   };

//   return (
//     <section>
//       <div className='form-container animate__animated animate__backInDown'>
//         <div className='modal hide-modal animate__animated animate__tada'>
//           <button className='close-btn' onClick={closeModal}>X</button>
//           <p className='modal-text'></p>
//           <a href='/books'><button className='nav-back-btn'>Back to Collection</button></a>
//         </div>

//         <div className='add-book-form'>
//           <h1>Add a new book.</h1>

//           {/* 7. Perbarui semua input agar menggunakan state */}
//           <div className='input-container'>
//             <label>Title: </label>
//             <input
//               type='text'
//               name='title' // Tambah 'name'
//               value={form.title} // Tambah 'value'
//               onChange={handleChange} // Gunakan handler tunggal
//               placeholder='Title'
//               required
//             />
//           </div>
//           <div className='input-container'>
//             <label>Author: </label>
//             <input
//               type='text'
//               name='author' // Tambah 'name'
//               value={form.author} // Tambah 'value'
//               onChange={handleChange} // Gunakan handler tunggal
//               placeholder='Author'
//               required
//             />
//           </div>
//           <div className='input-container'>
//             <label># of Pages: </label>
//             <input
//               type='number'
//               name='bookPages' // Tambah 'name'
//               value={form.bookPages} // Tambah 'value'
//               onChange={handleChange} // Gunakan handler tunggal
//               placeholder='Total Pages'
//               required
//             />
//           </div>
//           <div className='input-container'>
//             <label>Date Published: </label>
//             <input
//               type='date'
//               name='publishDate' // Tambah 'name'
//               value={form.publishDate} // Tambah 'value'
//               onChange={handleChange} // Gunakan handler tunggal
//               required
//             />
//           </div>
//           <button className='addBook-btn' onClick={addNewBook}>Add Book</button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddBook;

import React, { useState } from 'react';
import { addBook } from '../../service/api';
import './addBook.css';
import 'animate.css';

const AddBook = () => {
  const [textData, setTextData] = useState({
    title: '',
    author: '',
    bookPages: 0,
    publishDate: '',
  });

  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (e) => {
    setTextData({
      ...textData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCoverChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const addNewBook = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Anda harus login terlebih dahulu');
      window.location.href = '/login';
      return;
    }

    if (!coverImage || !pdfFile) {
      alert('Harap masukkan file cover dan file PDF.');
      return;
    }

    const formData = new FormData();

    formData.append('title', textData.title);
    formData.append('author', textData.author);
    formData.append('no_of_pages', textData.bookPages); 
    formData.append('published_at', textData.publishDate); 
    formData.append('uploaded_by', user.id); 

    formData.append('coverImage', coverImage);
    formData.append('pdfFile', pdfFile);

    try {
      const response = await addBook(formData);

      document.querySelector('.modal-text').textContent = response.data.message;
      document.querySelector('.modal').classList.toggle('hide-modal');

    } catch (err) {
      console.error(err);
      alert('Gagal menambah buku: ' + (err.response?.data?.message || err.message));
    }
  };

  const closeModal = () => {
    document.querySelector('.modal').classList.toggle('hide-modal');
  };

  return (
    <section>
      <div className='form-container animate__animated animate__backInDown'>
        <div className='modal hide-modal animate__animated animate__tada'>
          <button className='close-btn' onClick={closeModal}>X</button>
          <p className='modal-text'></p>
          <a href='/books'><button className='nav-back-btn'>Back to Collection</button></a>
        </div>

        <div className='add-book-form'>
          <h1>Add a new book.</h1>
          <div className='input-container'>
            <label>Title: </label>
            <input
              type='text'
              name='title'
              value={textData.title}
              onChange={handleChange}
              placeholder='Title'
              required
            />
          </div>
          <div className='input-container'>
            <label>Author: </label>
            <input
              type='text'
              name='author'
              value={textData.author}
              onChange={handleChange}
              placeholder='Author'
              required
            />
          </div>
          <div className='input-container'>
            <label>Number of Pages: </label>
            <input
              type='number'
              name='bookPages'
              value={textData.bookPages}
              onChange={handleChange}
              placeholder='Total Pages'
              required
            />
          </div>
          <div className='input-container'>
            <label>Date Published: </label>
            <input
              type='date'
              name='publishDate'
              value={textData.publishDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className='input-container'>
            <label>Cover Image: </label>
            <input
              type='file'
              name='coverImage'
              id='cover-input'
              onChange={handleCoverChange}
              accept="image/*" 
              required
            />
          </div>
          <div className='input-container'>
            <label>PDF File: </label>
            <input
              type='file'
              name='pdfFile'
              id='pdf-input'
              onChange={handlePdfChange}
              accept=".pdf"
              required
            />
          </div>

          <button className='addBook-btn' onClick={addNewBook}>Add Book</button>
        </div>
      </div>
    </section>
  );
};

export default AddBook;