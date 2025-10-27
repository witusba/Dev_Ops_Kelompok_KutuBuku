// // import React, { useState, useEffect } from 'react';
// // import { getBooks, deleteBook } from '../../service/api';
// // import './books.css';
// // import 'animate.css';

// // const temp = [
// //   {
// //     id: 0,
// //     title: '',
// //     author: '',
// //     no_of_pages: 0,
// //     published_at: '',
// //   },
// // ];
// // const Books = () => {
// //   const [books, setBooks] = useState(temp);

// //   useEffect(() => {
// //     getAllBooks();
// //   }, []);

// //   const getAllBooks = async () => {
// //     let response = await getBooks();
// //     setBooks(response.data);
// //   };

// //   const deleteBookFromCollection = async (id) => {
// //     const response = await deleteBook(id);
// //     document.querySelector('.modal-text').textContent = response.data.message;
// //     document.querySelector('.modal').classList.toggle('hide-modal');
// //   };

// //   const closeModal = () => {
// //     document.querySelector('.modal').classList.toggle('hide-modal');
// //   };

// //   return (
// //     <section className='books-page animate__animated animate__backInDown'>
// //       <h1>Books Collection</h1>

// //       <div className='books-container '>
// //         <div className='modal hide-modal animate__animated animate__tada'>
// //           <button className='close-btn' onClick={closeModal}>
// //             X
// //           </button>
// //           <p className='modal-text'></p>
// //           <a href='/books'>
// //             <button className='nav-back-btn'>Back to Collection</button>
// //           </a>
// //         </div>
// //         {books.length > 0 ? (
// //           books.map((book) => (
// //             <div className='book-card'>
// //               <div className='book-card-header'>
// //                 <h2>
// //                   Title: <span className='light-text'>{book.title}</span>
// //                 </h2>
// //                 <h3>
// //                   Author: <span className='light-text'>{book.author}</span>
// //                 </h3>
// //                 <h4>
// //                   # of Pages: <span className='light-text'>{book.no_of_pages}</span>
// //                 </h4>
// //                 <h4>
// //                   Publish Date: <span className='light-text'>{book.published_at}</span>
// //                 </h4>
// //               </div>
// //               <div className='book-card-buttons'>
// //                 <a href={`books/editBook/${book.id}`}>
// //                   <button className='book-card-button edit-btn'>Edit</button>
// //                 </a>
// //                 <button className='book-card-button remove-btn' onClick={() => deleteBookFromCollection(book.id)}>
// //                   Remove
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className='book-card'>
// //             <div className='book-card-header'>
// //               <h2 className='light-text'>Collection is Empty!</h2>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Books;

// import React, { useState, useEffect } from 'react';
// import { getBooks, deleteBook } from '../../service/api';
// import './books.css';
// import 'animate.css';

// const temp = [
//   { id: 0, title: '', author: '', no_of_pages: 0, published_at: '', owner: '' },
// ];

// const Books = () => {
//   const [books, setBooks] = useState(temp);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedUser = JSON.parse(localStorage.getItem('user'));
//     setUser(loggedUser);
//     getAllBooks();
//   }, []);

//   const getAllBooks = async () => {
//     let response = await getBooks();
//     setBooks(response.data);
//   };

//   const deleteBookFromCollection = async (id) => {
//     const response = await deleteBook(id);
//     document.querySelector('.modal-text').textContent = response.data.message;
//     document.querySelector('.modal').classList.toggle('hide-modal');
//   };

//   const closeModal = () => {
//     document.querySelector('.modal').classList.toggle('hide-modal');
//   };

//   const canModify = (bookOwner) => {
//     if (!user) return false;
//     return user.role === 'admin' || user.username === bookOwner;
//   };

//   return (
//     <section className='books-page animate__animated animate__backInDown'>
//       <h1>Books Collection</h1>
//       <div className='books-container'>
//         <div className='modal hide-modal animate__animated animate__tada'>
//           <button className='close-btn' onClick={closeModal}>X</button>
//           <p className='modal-text'></p>
//           <a href='/books'><button className='nav-back-btn'>Back to Collection</button></a>
//         </div>

//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book.id} className='book-card'>
//               <div className='book-card-header'>
//                 <h2>Title: <span className='light-text'>{book.title}</span></h2>
//                 <h3>Author: <span className='light-text'>{book.author}</span></h3>
//                 <h4># of Pages: <span className='light-text'>{book.no_of_pages}</span></h4>
//                 <h4>Publish Date: <span className='light-text'>{book.published_at}</span></h4>
//                 {book.owner && <p className='light-text'>Uploaded by: {book.owner}</p>}
//               </div>

//               <div className='book-card-buttons'>
//                 {canModify(book.owner) && (
//                   <>
//                     <a href={`books/editBook/${book.id}`}>
//                       <button className='book-card-button edit-btn'>Edit</button>
//                     </a>
//                     <button
//                       className='book-card-button remove-btn'
//                       onClick={() => deleteBookFromCollection(book.id)}
//                     >
//                       Remove
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className='book-card'>
//             <div className='book-card-header'>
//               <h2 className='light-text'>Collection is Empty!</h2>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Books;


import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../../service/api';
import { useSearchParams } from 'react-router-dom';
import './books.css';
import 'animate.css';

const SERVER_URL = 'http://localhost:8082';

const temp = [];

const Books = () => {
  const [books, setBooks] = useState(temp);
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedUser);
    const searchQuery = searchParams.get('search');

    getAllBooks(searchQuery);

  }, [searchParams]);

  const getAllBooks = async (query) => {
    try {
      let response = await getBooks(query);
      setBooks(response.data);
    } catch (error) {
      console.error("Gagal memuat buku:", error);
      alert("Gagal memuat koleksi buku.");
    }
  };

  const deleteBookFromCollection = async (id) => {
    if (!user) return alert("Anda harus login untuk menghapus buku.");
    if (!window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      return;
    }

    try {
      const response = await deleteBook(id, user.id, user.role);
      document.querySelector('.modal-text').textContent = response.data.message;
      document.querySelector('.modal').classList.toggle('hide-modal');
      getAllBooks();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus buku: ' + (err.response?.data?.message || err.message));
    }
  };

  const closeModal = () => {
    document.querySelector('.modal').classList.toggle('hide-modal');
  };

  const canModify = (bookOwnerId) => {
    if (!user) return false;
    return user.role === 'admin' || user.id === bookOwnerId;
  };

  return (
    <section className='books-page animate__animated animate__backInDown'>
      <h1>Books Collection</h1>
      <div className='books-container'>
        <div className='modal hide-modal animate__animated animate__tada'>
          <button className='close-btn' onClick={closeModal}>X</button>
          <p className='modal-text'></p>
          <button className='nav-back-btn' onClick={() => window.location.reload()}>Back to Collection</button>
        </div>

        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className='book-card'>
              <div>
                <a
                  href={`${SERVER_URL}${book.pdf_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='book-card-cover-link'
                >
                  <img
                    src={`${SERVER_URL}${book.cover_image}`}
                    alt={book.title}
                    className='book-card-cover'
                  />
                </a>

                <div className='book-card-header'>
                  <h2>Title: <span className='light-text'>{book.title}</span></h2>
                  <h3>Author: <span className='light-text'>{book.author}</span></h3>
                  <h4># of Pages: <span className='light-text'>{book.no_of_pages}</span></h4>
                  <h4>Publish Date: <span className='light-text'>{new Date(book.published_at).toLocaleDateString()}</span></h4>

                  {book.owner_username && (
                    <p className='book-card-uploader'>
                      Uploaded by: {book.owner_username}
                    </p>
                  )}
                </div>
              </div>

              <div className='book-card-buttons'>
                {canModify(book.uploaded_by) && (
                  <>
                    <a href={`books/editBook/${book.id}`} style={{ width: '48%' }}>
                      <button className='book-card-button edit-btn'>Edit</button>
                    </a>
                    <button
                      className='book-card-button remove-btn'
                      onClick={() => deleteBookFromCollection(book.id)}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='book-card'>
            <div className='book-card-header'>
              <h2 className='light-text'>Collection is Empty!</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;
