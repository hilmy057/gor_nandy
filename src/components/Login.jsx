import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../service/supabaseClient';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire('Error', 'Harap isi semua field', 'error');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) throw error;
  
      console.log('Login successful, navigating to /beranda');
      Swal.fire('Sukses', 'Login berhasil', 'success');
      navigate('/beranda');
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire('Error', error.message || 'Terjadi kesalahan saat login', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 z-0">
        <img
          src="/courted.jpg"
          alt="Stadium Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="z-10 bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4 flex justify-between text-sm">
            <Link to="/beranda" className="text-green-600 hover:underline">Kembali</Link>
            <Link to="/forgot-password" className="text-green-600 hover:underline">Lupa Sandi?</Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Memproses...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Belum punya akun? <Link to="/register" className="text-green-600 hover:underline">Daftar</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
