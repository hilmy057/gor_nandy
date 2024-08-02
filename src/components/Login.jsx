  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { supabase } from '../service/supabaseClient';
  import {
    Box,
    Button,
    Container,
    FormControl,
    Input,
    VStack,
    Heading,
    Text,
    Link as ChakraLink,
    useToast,
    Checkbox,
    Flex,
  } from '@chakra-ui/react';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate('/beranda');
        } else {
          // Load saved email if available
          const savedEmail = localStorage.getItem('savedEmail');
          if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
          }
        }
      };
      checkSession();
    }, [navigate]);

    const handleLogin = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast({
          title: 'Error',
          description: 'Harap isi semua field',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
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
        
        // Save email if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem('savedEmail', email);
        } else {
          localStorage.removeItem('savedEmail');
        }

        toast({
          title: 'Sukses',
          description: 'Login berhasil',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/beranda');
      } catch (error) {
        console.error('Login error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Terjadi kesalahan saat login',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgImage="url('/courted.jpg')"
        bgSize="cover"
        bgPosition="center"
      >
        <Container
          maxW="md"
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          zIndex={1}
        >
          <VStack spacing={6}>
            <Heading as="h2" size="xl" color="green.600">
              Login
            </Heading>
            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormControl>
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Checkbox 
                    isChecked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    colorScheme="green"
                    size="sm"
                  >
                    Ingat saya
                  </Checkbox>
                  <ChakraLink as={Link} to="/forgot-password" color="green.600" fontSize="sm">
                    Lupa Sandi?
                  </ChakraLink>
                </Flex>
                <Button
                  type="submit"
                  colorScheme="green"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Memproses..."
                >
                  Login
                </Button>
              </VStack>
            </form>
            <Flex width="100%" justifyContent="space-between" alignItems="center">
              <ChakraLink as={Link} to="/beranda" color="green.600" fontSize="sm">
                Kembali
              </ChakraLink>
              <Text fontSize="sm">
                Belum punya akun?{' '}
                <ChakraLink as={Link} to="/register" color="green.600">
                  Daftar
                </ChakraLink>
              </Text>
            </Flex>
          </VStack>
        </Container>
      </Box>
    );
  };

  export default Login;