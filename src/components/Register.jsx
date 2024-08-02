import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../service/supabaseClient';
import Swal from 'sweetalert2';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || !namaLengkap || !noHp || !alamat || !jenisKelamin) {
      Swal.fire('Error!', 'Please fill in all fields', 'error');
      return;
    }
  
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) throw authError;
  
      // Update the user's profile with additional information
      const { error: updateError } = await supabase
        .from('users')
        .update({
          nama_lengkap: namaLengkap,
          no_hp: noHp,
          alamat,
          jenis_kelamin: jenisKelamin,
        })
        .eq('id', authData.user.id);
  
      if (updateError) throw updateError;
  
      Swal.fire('Sukses!', 'Registrasi berhasil', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire('Error!', `Registration failed: ${error.message}`, 'error');
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/courted.jpg"
          alt="Stadium"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Registration Form */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Daftar</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="No HP"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <select
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Daftar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Sudah punya akun? <Link to="/login" className="text-green-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
