import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Schedule from './components/schedule';
import Contact from './components/Contact';
import Pemesanan from './components/Pemesanan';
import Profile from './components/Profile';
import RiwayatPesan from './components/RiwayatPesan';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/beranda" element={<Home />} />
          <Route path="/tentang" element={<AboutUs />} />
          <Route path="/jadwal" element={<Schedule />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/pemesanan" element={<Pemesanan />} />
          <Route path="/riwayat-pemesanan" element={<RiwayatPesan />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
