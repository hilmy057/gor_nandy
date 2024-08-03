import React, { useState, useEffect } from 'react';
import { supabase } from '../service/supabaseClient';
import Swal from 'sweetalert2';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  useToast,
} from '@chakra-ui/react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) console.error('Error fetching user data:', error);
      else setUser(data);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('users')
      .update(user)
      .eq('id', user.id);
    if (error) {
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Sukses!',
        description: 'Profile updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user) return <Box>Loading...</Box>;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} as="form" onSubmit={handleUpdate}>
        <Heading>Profil Pengguna</Heading>
        <FormControl>
          <FormLabel>Nama Lengkap</FormLabel>
          <Input
            value={user.nama_lengkap}
            onChange={(e) => setUser({...user, nama_lengkap: e.target.value})}
          />
        </FormControl>
        {/* Tambahkan field lainnya */}
        <Button type="submit" colorScheme="green" width="full">
          Update Profile
        </Button>
      </VStack>
    </Container>
  );
};

export default Profile;