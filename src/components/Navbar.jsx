import React, { useCallback, useMemo } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const NavLink = React.memo(({ to, children, onClick }) => {
  const location = useLocation();
  const bgColor = useColorModeValue('green.100', 'green.700');
  
  return (
    <Link
      as={RouterLink}
      to={to}
      px={3}
      py={2}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: bgColor,
        color: 'green.600',
      }}
      bg={location.pathname === to ? bgColor : 'transparent'}
      fontWeight={location.pathname === to ? 'bold' : 'normal'}
      onClick={onClick}
      transition="all 0.3s"
    >
      {children}
    </Link>
  );
});

const Navbar = React.memo(({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  }, [setUser, navigate]);

  const bgColor = useColorModeValue('green.50', 'green.900');
  const textColor = useColorModeValue('green.800', 'green.100');

  const navItems = useMemo(() => 
    user
      ? [
          { label: 'Beranda', href: '/beranda' },
          { label: 'Pemesanan', href: '/pemesanan' },
          { label: 'Pembayaran', href: '/pembayaran' },
        ]
      : [
          { label: 'Beranda', href: '/' },
          { label: 'Tentang', href: '/tentang' },
          { label: 'Jadwal', href: '/jadwal' },
          { label: 'Kontak', href: '/kontak' },
        ],
    [user]
  );

  const renderNavItems = useCallback(() => 
    navItems.map((navItem) => (
      <NavLink key={navItem.label} to={navItem.href} onClick={onToggle}>
        {navItem.label}
      </NavLink>
    )),
    [navItems, onToggle]
  );

  return (
    <Box bg={bgColor} px={4} position="fixed" top={0} left={0} right={0} zIndex={1000} boxShadow="md">
      <Container maxW={'6xl'}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={onToggle}
            variant="outline"
            colorScheme="green"
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                Gor Nandy
              </Text>
            </Box>
            <HStack as={'nav'} spacing={6} display={{ base: 'none', md: 'flex' }}>
              {renderNavItems()}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={user.user_metadata?.avatar_url}
                    name={user.user_metadata?.nama_lengkap}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile" color={textColor}>
                    Profil
                  </MenuItem>
                  <MenuItem onClick={handleLogout} color={textColor}>Keluar</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'green.400'}
                _hover={{
                  bg: 'green.500',
                }}
                _active={{
                  bg: 'green.600',
                }}
                transition="all 0.3s"
              >
                Masuk
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {renderNavItems()}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
});

export default Navbar;