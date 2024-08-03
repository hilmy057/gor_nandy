import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { supabase } from './service/supabaseClient';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Schedule from './components/schedule';
import Contact from './components/Contact';
import Pemesanan from './components/Pemesanan';
import Profile from './components/Profile';
import Pembayaran from './components/Pembayaran';
import Loading from './components/Loading';
import { useCustomToast } from './hook/useCustomToast';
import ErrorBoundary from './components/ErrorBoundary';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return <Loading message="Memeriksa otentikasi..." />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error('Error checking auth state:', error);
        showErrorToast('Terjadi kesalahan', 'Gagal memeriksa status otentikasi');
        setLoading(false);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          showSuccessToast('Login berhasil!', `Selamat datang, ${session.user.email}`);
        } else if (event === 'SIGNED_OUT') {
          showSuccessToast('Logout berhasil', 'Sampai jumpa lagi!');
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [showSuccessToast, showErrorToast]);

  if (loading) {
    return <Loading message="Memuat aplikasi..." />;
  }

  return (
    <ChakraProvider>
      <ErrorBoundary>
        <Router>
          <Box className="App">
            <Navbar user={user} />
      
            <Box pt="64px">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home user={user} />} />
                <Route path="/beranda" element={<Home user={user} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tentang" element={<AboutUs />} />
                <Route path="/jadwal" element={<Schedule />} />
                <Route path="/kontak" element={<Contact />} />

                {/* Private routes */}
                <Route path="/pemesanan" element={
                  <PrivateRoute>
                    <Pemesanan />
                  </PrivateRoute>
                } />
                <Route path="/pembayaran" element={
                  <PrivateRoute>
                    <Pembayaran />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />

                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;