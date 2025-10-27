// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // export default function Login() {
// // //   const [form, setForm] = useState({ email: "", password: "" });
// // //   const navigate = useNavigate();

// // //   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

// // //   const handleSubmit = async e => {
// // //     e.preventDefault();
// // //     try {
// // //       const res = await axios.post("http://localhost:5000/api/login", form);
// // //       localStorage.setItem("token", res.data.token);
// // //       localStorage.setItem("role", res.data.role);
// // //       localStorage.setItem("userId", res.data.id);
// // //       localStorage.setItem("username", res.data.username);
// // //       navigate("/home");
// // //     } catch {
// // //       alert("Login gagal");
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-container">
// // //       <h2>Login</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <input name="email" placeholder="Email" onChange={handleChange} required />
// // //         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
// // //         <button type="submit">Login</button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // import React, { useState } from "react";
// // // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { loginUser } from '../../service/api';

// // export default function Login() {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const navigate = useNavigate();

// //   const handleChange = e =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     try {
// //       // Ganti axios.post dengan fungsi API
// //       const res = await loginUser(form); // 'form' adalah state {email, password}

// //       localStorage.setItem("user", JSON.stringify(res.data.user));

// //       alert("Login berhasil!");
// //       navigate("/");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Login gagal, periksa email dan password!");
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <h2>Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           name="email"
// //           placeholder="Email"
// //           onChange={handleChange}
// //           required
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           onChange={handleChange}
// //           required
// //         />
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom"; 
// import { loginUser } from '../../service/api';
// import './auth.css'; 

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = e =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(form);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       alert("Login berhasil!");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Login gagal, periksa email dan password!");
//     }
//   };

//   return (
//     <div className="auth-page-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <span className="auth-logo">Kutu</span><span className="auth-kiri">Buku</span>
//         </div>

//         <h2 className="auth-title">Selamat Datang Kembali Cuy!</h2>
//         <p className="auth-subtitle">Silakan login ke akun anda</p>

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <div className="auth-input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               placeholder="email@Anda.com"
//               className="auth-input"
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="auth-input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               className="auth-input"
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="auth-button">Login</button>
//         </form>

//         <p className="auth-switch-link">
//           Belum punya akun? <Link to="/register">Daftar di sini</Link>
//         </p>

//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from '../../service/api';
import './auth.css';
import toast, { Toaster } from 'react-hot-toast';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const loginPromise = loginUser(form);

    toast.promise(
      loginPromise,
      {
        loading: 'Mencoba login...',
        success: (res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
          setTimeout(() => {
            navigate("/");
          }, 1500);

          return "Login berhasil! Selamat datang.";
        },
        error: (err) => {
          return err.response?.data?.message || "Login gagal, periksa email dan password!";
        }
      },
      {
        style: {
          minWidth: '250px',
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 1500,
          iconTheme: {
            primary: '#28a745',
            secondary: '#fff',
          },
        },
        error: {
          duration: 3000,
          iconTheme: {
            primary: '#dc3545',
            secondary: '#fff',
          },
        }
      }
    );
  };

  return (
    <div className="auth-page-container">
      <Toaster position="top-center" />

      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">Kutu</span><span className="auth-kiri">Buku</span>
        </div>

        <h2 className="auth-title">Selamat Datang Kembali Cuy!</h2>
        <p className="auth-subtitle">Silakan login ke akun anda</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="email@Anda.com"
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="auth-switch-link">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>

      </div>
    </div>
  );
}