// import React, { useState } from "react";
// import { registerUser } from '../../service/api'
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
//   const navigate = useNavigate();

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await registerUser(form);

//       alert("Register berhasil! Silakan login.");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Registrasi gagal: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="username" placeholder="Username" onChange={handleChange} required />
//         <input name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <select name="role" onChange={handleChange}>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { registerUser } from '../../service/api'
import { useNavigate, Link } from "react-router-dom";
import './auth.css'; 

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Register berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registrasi gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">

        <div className="auth-header">
          <span className="auth-logo">Kutu</span><span className="auth-kiri">Buku</span>
        </div>

        <h2 className="auth-title">Buat Akun Baru</h2>
        <p className="auth-subtitle">Isi data di bawah untuk mendaftar yaa cuy...</p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="auth-input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              placeholder="Username unik Anda"
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Minimal 8 karakter"
              className="auth-input"
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={form.role} 
              className="auth-input"
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="auth-button">Register</button>
        </form>

        <p className="auth-switch-link">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>

      </div>
    </div>
  );
}