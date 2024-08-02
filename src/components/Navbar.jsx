import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../service/supabaseClient';
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Container,
  HStack,
  Avatar,
  IconButton,
} from '@chakra-ui/react';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const Navbar = ({ user }) => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = user
    ? ['Beranda', 'Pemesanan', 'Pembayaran']
    : ['Beranda', 'Tentang', 'Jadwal', 'Kontak'];

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const hoverColor = useColorModeValue('green.500', 'green.300');

  return (
    <Box
      as="nav"
      bg={bgColor}
      boxShadow="sm"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      width="full"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" height="16">
          <MotionText
            fontSize="xl"
            fontWeight="bold"
            color="green.500"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Gor Nandy
          </MotionText>
          <HStack spacing={8}>
            {navItems.map((item) => {
              const path = item.toLowerCase().replace(' ', '-');
              const isActive = currentPath === path;

              return (
                <MotionBox
                  key={item}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Link
                    as={RouterLink}
                    to={`/${path}`}
                    color={isActive ? 'green.500' : textColor}
                    fontWeight={isActive ? 'semibold' : 'medium'}
                    position="relative"
                    _hover={{ color: hoverColor }}
                    transition="color 0.3s"
                  >
                    {item}
                    {isActive && (
                      <MotionBox
                        position="absolute"
                        bottom="-2px"
                        left={0}
                        width="100%"
                        height="2px"
                        bg="green.500"
                        layoutId="underline"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </MotionBox>
              );
            })}
          </HStack>
          {user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="User menu"
                icon={<Avatar size="sm" name={user.nama_lengkap} src={user.avatar_url} />}
                variant="ghost"
                _hover={{ bg: 'green.50' }}
              />
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link as={RouterLink} to="/login">
              <MotionButton
                colorScheme="green"
                variant="outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Masuk
              </MotionButton>
            </Link>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;