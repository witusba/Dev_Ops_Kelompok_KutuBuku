// // // import React from 'react';
// // // import hero from '../../assets/hero.jpg';
// // // import './home.css';
// // // import 'animate.css';

// // // const Home = () => {
// // //   return (
// // //     <section className='home-page'>
// // //       <div className='hero-container animate__animated animate__backInDown'>
// // //         <h1 className='hero__title'>Welcome to BXTrack Bookstore!</h1>
// // //         <img src={hero} alt='Family reading books' className='hero__image' />
// // //       </div>
// // //       <div className='home-page__btn animate__animated animate__backInDown'>
// // //         <a href='/books'>
// // //           <button>View Collection</button>
// // //         </a>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Home;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import hero from "../../assets/hero.jpg";
// // import "./home.css";

// // const Home = () => {
// //   const [books, setBooks] = useState([]);
// //   const userId = localStorage.getItem("userId");
// //   const role = localStorage.getItem("role");

// //   useEffect(() => {
// //     // ✅ BENAR: Arahkan ke port 8082 dan route /books
// //     axios.get("http://localhost:8082/books").then(res => setBooks(res.data));
// //   }, []);

// //   const handleDelete = async id => {
// //     // ✅ BENAR: Arahkan ke port 8082 dan route /books
// //     await axios.delete(`http://localhost:8082/books/${id}/${userId}/${role}`);
// //     setBooks(books.filter(b => b.id !== id));
// //   };

// //   return (
// //     <section className="home-page">
// //       <div className="hero-container">
// //         <h1>Welcome, {localStorage.getItem("username")}!</h1>
// //         <img src={hero} alt="hero" className="hero__image" />
// //       </div>

// //       <div className="home-page__btn">
// //         <a href="/books"><button>View Collection</button></a>
// //       </div>

// //       <div className="book-list">
// //         <h2>Book Collection</h2>
// //         {books.map(b => (
// //           <div key={b.id} className="book-item">
// //             <p><strong>{b.title}</strong> by {b.author}</p>
// //             <small>Uploader: {b.username}</small>
// //             {(role === "admin" || b.uploader_id == userId) && (
// //               <button onClick={() => handleDelete(b.id)}>Delete</button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default Home;

// import React, { useEffect, useState } from "react";
// import { getBooks, deleteBook } from '../../service/api'; // 1. Import dari service
// import hero from "../../assets/mangu.png";
// import "./home.css";

// const SERVER_URL = 'http://localhost:8082';

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [user, setUser] = useState(null); 

//   useEffect(() => {
//     const loggedUser = JSON.parse(localStorage.getItem('user'));
//     setUser(loggedUser);

//     const fetchBooks = async () => {
//       try {
//         const res = await getBooks();
//         setBooks(res.data.slice(0, 5));
//       } catch (err) {
//         console.error("Gagal fetch buku:", err);
//       }
//     }
//     fetchBooks();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!user) return alert("Silakan login ulang untuk menghapus.");

//     try {
//       await deleteBook(id, user.id, user.role);
//       alert("Buku berhasil dihapus.");
//       setBooks(books.filter(b => b.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert('Gagal menghapus buku: ' + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <section className="home-page">
//       <div className="hero-container">
//         <h1 className="hero__title">Welcome, {user?.username || 'Guest'}!</h1>
//         <img src={hero} alt="hero" className="hero__image" />
//       </div>

//       <div className="home-page__btn">
//         <a href="/books"><button>View Full Collection</button></a>
//       </div>

//       <div className="book-list-container">
//         <h2>Recently Added</h2>
//         <div className="book-list">
//           {books.map(b => (
//             <div key={b.id} className="book-item">
//               {user && (user.role === "admin" || b.uploaded_by === user.id) && (
//                 <button
//                   className="book-item-delete"
//                   title="Hapus buku"
//                   onClick={() => handleDelete(b.id)}
//                 >
//                   X
//                 </button>
//               )}

//               {/* untuk klik buku biar bisa dibuka */}
//               <a href={`${SERVER_URL}${b.pdf_link}`} target="_blank" rel="noopener noreferrer">
//                 <img
//                   src={`${SERVER_URL}${b.cover_image}`}
//                   alt={b.title}
//                   className="book-item-cover"
//                 />
//               </a>

//               <div className="book-item-info">
//                 <p className="book-item-title">{b.title}</p>
//                 <p className="book-item-author">by {b.author}</p>
//                 <small className="book-item-uploader">Uploader: {b.owner_username}</small>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from '../../service/api';
import hero from "../../assets/mangu.png";
import "./home.css";

const SERVER_URL = 'http://localhost:8082';

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data.slice(0, 5));
      } catch (err) {
        console.error("Gagal fetch buku:", err);
      }
    }
    fetchBooks();
  }, []); 

  const handleDelete = async (id) => {
    if (!user) return alert("Silakan login ulang untuk menghapus.");

    try {
      await deleteBook(id, user.id, user.role);
      alert("Buku berhasil dihapus.");
      setBooks(books.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus buku: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <section className="home-page">
      <div className="hero-container">
        <h1 className="hero__title">Welcome, {user?.username || 'Guest'}!</h1>
        <img src={hero} alt="hero" className="hero__image" />
      </div>

      <div className="home-page__btn">
        <a href="/books"><button>View Full Collection</button></a>
      </div>

      <div className="book-list-container">
        <h2>Recently Added</h2>
        <div className="book-list">
          {books.map(b => (
            <div key={b.id} className="book-item">
              {user && (user.role === "admin" || b.uploaded_by === user.id) && (
                <button
                  className="book-item-delete"
                  title="Hapus buku"
                  onClick={() => handleDelete(b.id)}
                >
                  X
                </button>
              )}

              <a href={`${SERVER_URL}${b.pdf_link}`} target="_blank" rel="noopener noreferrer">
                <img
                  src={`${SERVER_URL}${b.cover_image}`}
                  alt={b.title}
                  className="book-item-cover"
                />
              </a>

              <div className="book-item-info">
                <p className="book-item-title">{b.title}</p>
                <p className="book-item-author">by {b.author}</p>
                <small className="book-item-uploader">Uploader: {b.owner_username}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;