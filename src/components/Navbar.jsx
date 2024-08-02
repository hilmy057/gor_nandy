import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../service/supabaseClient';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      console.log('Session Data in Navbar:', sessionData);
  
      if (sessionData.session) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', sessionData.session.user.id)
          .single();
  
        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          console.log('User Data:', userData);
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    };
  
    fetchUser();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth State Change Event:', event);
      if (session) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
  
        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          console.log('User Data:', userData);
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    });
  
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
  };

  const navItems = user
    ? ['Beranda', 'Pemesanan', 'Pembayaran']
    : ['Beranda', 'Tentang', 'Jadwal', 'Kontak'];

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center shadow-md w-full font-open-sans">
      <motion.div 
        className="text-xl font-bold text-green-600"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Gor Nandy
      </motion.div>
      <div className="relative flex space-x-4">
        {navItems.map((item) => {
          const path = item.toLowerCase().replace(' ', '-');
          const isActive = currentPath === path;

          return (
            <motion.span
              key={item}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Link 
                to={`/${path}`} 
                className={`relative text-green-700 hover:text-green-500 transition-colors duration-300 ${isActive ? 'font-bold' : ''}`}
              >
                {item}
                {isActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-md"
                    layoutId="underline"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.span>
          );
        })}
      </div>
      {user ? (
  <div className="relative">
    <motion.button 
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      {user.nama_lengkap || 'Profil'}
    </motion.button>
    {showDropdown && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
      </div>
    )}
  </div>
      ) : (
        <Link to="/login">
          <motion.button 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Masuk
          </motion.button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;