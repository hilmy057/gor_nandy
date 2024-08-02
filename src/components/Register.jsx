import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { supabase } from '../service/supabaseClient';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  Select,
  useToast,
} from '@chakra-ui/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !namaLengkap || !noHp || !alamat || !jenisKelamin) {
      toast({
        title: 'Error!',
        description: 'Harap isi semua field',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) throw authError;
  
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
  
      toast({
        title: 'Sukses!',
        description: 'Registrasi berhasil',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Error!',
        description: `Registrasi gagal: ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
          <Heading as="h2" size="xl" color="green.500">
            Daftar
          </Heading>
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  placeholder="No HP"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Select
                  placeholder="Pilih Jenis Kelamin"
                  value={jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="green" width="full">
                Daftar
              </Button>
            </VStack>
          </form>
          <Text fontSize="sm">
            Sudah punya akun?{' '}
            <Link as={RouterLink} to="/login" color="green.500">
              Login
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Register;
