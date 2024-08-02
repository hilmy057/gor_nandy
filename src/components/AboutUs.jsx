import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className="relative w-full min-h-screen bg-cover bg-center font-open-sans" style={{ backgroundImage: "url('/courted.jpg')" }}>
      {/* Overlay untuk memberikan efek gelap pada gambar latar belakang */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>
      
      {/* Konten utama dengan efek overlay dan posisi relatif */}
      <div className="relative z-10 flex items-center justify-center w-full min-h-screen px-4 py-16">
        <motion.div 
          className="bg-white bg-opacity-90 p-8 rounded-lg max-w-4xl mx-auto text-center shadow-2xl"
          initial={{ opacity: 0, y: 50 }} // Inisialisasi animasi dengan opacity 0 dan posisi Y 50
          animate={{ opacity: 1, y: 0 }} // Animasi menuju opacity 1 dan posisi Y 0
          transition={{ duration: 0.8 }} // Durasi animasi
        >
          {/* Judul halaman */}
          <motion.h1 
            className="text-4xl font-bold mb-8 text-green-700"
            initial={{ opacity: 0 }} // Inisialisasi animasi dengan opacity 0
            animate={{ opacity: 1 }} // Animasi menuju opacity 1
            transition={{ delay: 0.3, duration: 0.5 }} // Delay dan durasi animasi
          >
            Tentang Kami
          </motion.h1>
          
          <div className="flex flex-col gap-8 text-gray-800">
            {/* Subjudul dengan animasi */}
            <motion.h2 
              className="text-2xl font-semibold mb-4 text-green-600"
              initial={{ opacity: 0 }} // Inisialisasi animasi dengan opacity 0
              animate={{ opacity: 1 }} // Animasi menuju opacity 1
              transition={{ delay: 0.5, duration: 0.5 }} // Delay dan durasi animasi
            >
              Kenapa Memilih Kami?
            </motion.h2>
            
            {/* Deskripsi tentang pusat olahraga */}
            <motion.p
              initial={{ opacity: 0 }} // Inisialisasi animasi dengan opacity 0
              animate={{ opacity: 1 }} // Animasi menuju opacity 1
              transition={{ delay: 0.7, duration: 0.5 }} // Delay dan durasi animasi
            >
              Sport Center adalah pusat olahraga premium yang menyediakan fasilitas terbaik dan layanan
              penyewaan lapangan untuk berbagai jenis olahraga. Kami berkomitmen untuk menciptakan
              lingkungan yang mendukung gaya hidup sehat dan aktif bagi semua kalangan.
            </motion.p>
            
            <motion.p 
              className="mt-4"
              initial={{ opacity: 0 }} // Inisialisasi animasi dengan opacity 0
              animate={{ opacity: 1 }} // Animasi menuju opacity 1
              transition={{ delay: 0.9, duration: 0.5 }} // Delay dan durasi animasi
            >
              Kami menawarkan beragam lapangan berkualitas tinggi untuk berbagai olahraga populer,
              termasuk sepak bola, futsal, tenis, basket, dan voli. Setiap lapangan dilengkapi dengan
              fasilitas modern dan perawatan rutin untuk menjamin pengalaman olahraga yang optimal.
            </motion.p>
            
            {/* Bagian fitur dengan ikon */}
            <motion.div 
              className="mt-8 flex justify-center space-x-4"
              initial={{ opacity: 0 }} // Inisialisasi animasi dengan opacity 0
              animate={{ opacity: 1 }} // Animasi menuju opacity 1
              transition={{ delay: 1.1, duration: 0.5 }} // Delay dan durasi animasi
            >
              <Feature icon="🏆" text="Fasilitas Berkualitas" />
              <Feature icon="🔧" text="Perawatan Rutin" />
              <Feature icon="🤝" text="Layanan Ramah" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Komponen untuk menampilkan fitur dengan ikon dan teks
const Feature = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl mb-2">{icon}</span>
    <p className="text-sm font-semibold text-green-700">{text}</p>
  </div>
);

export default AboutUs;
