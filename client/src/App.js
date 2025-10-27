// // import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // //Components
// // import Navbar from './components/Navbar/Navbar';

// // //Pages
// // import Home from './pages/Home/Home';
// // import Books from './pages/Books/Books';
// // import AddBook from './pages/Books/AddBook';
// // import EditBook from './pages/Books/EditBook';

// // //CSS
// // import './App.css';

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Navbar />
// //       <Routes>
// //         <Route path='/' element={<Home />} />
// //         <Route path='/books' element={<Books />} />
// //         <Route path='/addBook' element={<AddBook />} />
// //         <Route path='/books/editBook/:id' element={<EditBook />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // Components
// import Navbar from './components/Navbar/Navbar';

// // Pages
// import Home from './pages/Home/Home';
// import Books from './pages/Books/Books';
// import AddBook from './pages/Books/AddBook';
// import EditBook from './pages/Books/EditBook';
// import Login from './pages/Auth/login';       
// import Register from './pages/Auth/register'; 
// import './App.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/addBook" element={<AddBook />} />
//         <Route path="/books/editBook/:id" element={<EditBook />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Books from './pages/Books/Books';
import AddBook from './pages/Books/AddBook';
import EditBook from './pages/Books/EditBook';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []); 

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<Home user={user} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/books/editBook/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;