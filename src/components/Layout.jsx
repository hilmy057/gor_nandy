import React from 'react';
import Navbar from './Navbar';
import { Box } from '@chakra-ui/react';

const Layout = ({ children, user, setUser }) => {
  return (
    <Box>
      <Navbar user={user} setUser={setUser} />
      <Box pt="64px"> {/* Memberikan padding top agar konten tidak tertutup navbar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;