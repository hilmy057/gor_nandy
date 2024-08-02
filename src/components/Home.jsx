import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className="relative h-screen font-open-sans">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/courted.jpg"
          alt="Stadium"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col">
        
        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center">
          <motion.div 
            className="text-center text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-4 text-emerald-400">Sehatkan Dirimu</h1>
            <h2 className="text-4xl font-semibold mb-4 text-green-300">Dengan Berolahraga</h2>
            <h3 className="text-3xl mb-8 text-green-200">di Gor Nandy</h3>
            
            <motion.button 
              onClick={handleButtonClick}
              className="bg-green-500 text-white px-6 py-3 rounded-full text-xl hover:bg-green-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Pesan Sekarang
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;