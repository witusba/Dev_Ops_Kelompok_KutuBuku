// // // import React, { useState } from 'react';
// // // import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
// // // import logo from '../../assets/logoku.png';
// // // import './navbar.css';

// // // const Menu = () => (
// // //   <>
// // //     <p>
// // //       <a href='/'>Home</a>
// // //     </p>
// // //     <p>
// // //       <a href='/books'>View Books</a>
// // //     </p>
// // //     <p>
// // //       <a href='/addBook'>Add Book</a>
// // //     </p>
// // //     <p>
// // //       <a href='/login'>Login</a>
// // //     </p>
// // //   </>
// // // );

// // // const Navbar = () => {
// // //   const [toggleMenu, setToggleMenu] = useState(false);
// // //   return (
// // //     <nav className='navbar'>
// // //       <div className='navbar-links'>
// // //         <div className='navbar-links_logo'>
// // //           <img src={logo} alt='logo' />
// // //         </div>
// // //         <div className='navbar-links_container'>
// // //           <Menu />
// // //         </div>
// // //       </div>
// // //       <div className='navbar-menu'>
// // //         {toggleMenu ? (
// // //           <RiCloseLine color='#000' size={27} onClick={() => setToggleMenu(false)} />
// // //         ) : (
// // //           <RiMenu3Line color='#000' size={27} onClick={() => setToggleMenu(true)} />
// // //         )}
// // //         {toggleMenu && (
// // //           <div className='navbar-menu_container scale-up-center'>
// // //             <div className='navbar-menu_container-links'>
// // //               <Menu />
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;

// // import React, { useState, useEffect } from 'react';
// // import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
// // import { Link, useNavigate } from 'react-router-dom'; 
// // import logo from '../../assets/logoku.png';
// // import './navbar.css';

// // const Menu = ({ user, onLogout }) => (
// //   <>
// //     <Link to="/">Home</Link>
// //     {user && <Link to="/books">View Books</Link>}
// //     {user && <Link to="/addBook">Add Book</Link>}
// //   </>
// // );

// // const AuthButtons = ({ user, onLogout }) => {
// //   if (user) {
// //     return (
// //       <div className="navbar-auth-user">
// //         <span className="navbar-welcome-text">Welcome, {user.username}!</span>
// //         <button type="button" className="navbar-auth-button" onClick={onLogout}>
// //           Logout
// //         </button>
// //       </div>
// //     );
// //   } else {
// //     return (
// //       <div className="navbar-auth-links">
// //         <Link to="/login" className="navbar-auth-link">Login</Link>
// //         <Link to="/register" className="navbar-auth-button">Register</Link>
// //       </div>
// //     );
// //   }
// // };

// // const Navbar = () => {
// //   const [toggleMenu, setToggleMenu] = useState(false);
// //   const [user, setUser] = useState(null); 
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const loggedUser = JSON.parse(localStorage.getItem('user'));
// //     if (loggedUser) {
// //       setUser(loggedUser);
// //     }
// //   }, []); 

// //   const handleLogout = () => {
// //     localStorage.removeItem('user');
// //     setUser(null);
// //     setToggleMenu(false); 
// //     navigate('/login');
// //   };

// //   return (
// //     <nav className='navbar'>
// //       <div className='navbar-links'>
// //         <div className='navbar-links_logo'>
// //           <Link to="/">
// //             <img src={logo} alt='logo' />
// //           </Link>
// //         </div>
// //         <div className='navbar-links_container'>
// //           <Menu user={user} />
// //         </div>
// //       </div>

// //       <div className="navbar-auth">
// //         <AuthButtons user={user} onLogout={handleLogout} />
// //       </div>

// //       <div className='navbar-menu'>
// //         {toggleMenu ? (
// //           <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)} />
// //         ) : (
// //           <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)} />
// //         )}
// //         {toggleMenu && (
// //           <div className='navbar-menu_container scale-up-center'>
// //             <div className='navbar-menu_container-links'>
// //               <Menu user={user} />
// //               <div className="navbar-menu_container-auth">
// //                 <AuthButtons user={user} onLogout={handleLogout} />
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React, { useState } from 'react';
// import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
// import { Link, useNavigate } from 'react-router-dom'; // Gunakan Link dan useNavigate
// import logo from '../../assets/logoku.png';
// import './navbar.css';

// // Terima 'user' dan 'setUser' dari props App.js
// const Navbar = ({ user, setUser }) => {
//   const [toggleMenu, setToggleMenu] = useState(false);
//   const navigate = useNavigate();

//   // Fungsi logout sekarang memberi tahu App.js
//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null); // Update state di App.js
//     setToggleMenu(false); // Tutup menu mobile
//     navigate('/login');
//   };

//   // Komponen Menu internal
//   const Menu = () => (
//     <>
//       <Link to="/">Home</Link>
//       {/* Tampilkan link hanya jika user ada */}
//       {user && <Link to="/books">View Books</Link>}
//       {user && <Link to="/addBook">Add Book</Link>}
//     </>
//   );

//   // Komponen Tombol Auth internal
//   const AuthButtons = () => {
//     if (user) {
//       // Tampilan jika sudah login
//       return (
//         <div className="navbar-auth-user">
//           <span className="navbar-welcome-text">Welcome, {user.username}!</span>
//           <button type="button" className="navbar-auth-button" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       );
//     } else {
//       // Tampilan jika belum login
//       return (
//         <div className="navbar-auth-links">
//           <Link to="/login" className="navbar-auth-link">Login</Link>
//           <Link to="/register" className="navbar-auth-button">Register</Link>
//         </div>
//       );
//     }
//   };

//   return (
//     <nav className='navbar'>
//       <div className='navbar-links'>
//         <div className='navbar-links_logo'>
//           <Link to="/">
//             <img src={logo} alt='logo' />
//           </Link>
//         </div>
//         <div className='navbar-links_container'>
//           <Menu />
//         </div>
//       </div>

//       {/* Tombol Auth untuk Desktop */}
//       <div className="navbar-auth">
//         <AuthButtons />
//       </div>

//       {/* Menu Mobile */}
//       <div className='navbar-menu'>
//         {toggleMenu ? (
//           <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)} />
//         ) : (
//           <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)} />
//         )}
//         {toggleMenu && (
//           <div className='navbar-menu_container scale-up-center'>
//             <div className='navbar-menu_container-links'>
//               <Menu /> {/* Tampilkan menu di mobile */}
//               <div className="navbar-menu_container-auth">
//                 <AuthButtons /> {/* Tampilkan tombol auth di mobile */}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logoku.png';
import './navbar.css';

const Menu = ({ user }) => (
  <>
    <Link to="/">Home</Link>
    {user && <Link to="/books">View Books</Link>}
    {user && <Link to="/addBook">Add Book</Link>}
  </>
);

const AuthButtons = ({ user, onLogout }) => {
  if (user) {
    return (
      <div className="navbar-auth-user">
        <span className="navbar-welcome-text">Welcome, {user.username}!</span>
        <button type="button" className="navbar-auth-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="navbar-auth-links">
        <Link to="/login" className="navbar-auth-link">Login</Link>
        <Link to="/register" className="navbar-auth-button">Register</Link>
      </div>
    );
  }
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?search=${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };

  return (
    <form className="navbar-search" onSubmit={handleSearch}>
      <input
        type="text"
        className="navbar-search-input"
        placeholder="Cari buku berdasarkan judul..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="navbar-search-button">
        <RiSearchLine color='#fff' size={20} />
      </button>
    </form>
  );
};

const Navbar = ({ user, setUser }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setToggleMenu(false);
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links_logo'>
          <Link to="/">
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <div className='navbar-links_container'>
          <Menu user={user} />
        </div>
      </div>

      <div className="navbar-search-container">
        <SearchBar />
      </div>
      <div className="navbar-auth">
        <AuthButtons user={user} onLogout={handleLogout} />
      </div>

      <div className='navbar-menu'>
        {toggleMenu ? (
          <RiCloseLine color='#fff' size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color='#fff' size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className='navbar-menu_container scale-up-center'>
            <div className='navbar-menu_container-links'>
              <div className="navbar-menu_container-search">
                <SearchBar />
              </div>

              <Menu user={user} />

              <div className="navbar-menu_container-auth">
                <AuthButtons user={user} onLogout={handleLogout} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;