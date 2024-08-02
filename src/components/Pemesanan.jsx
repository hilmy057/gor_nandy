import React, { useState, useEffect } from 'react';
import { supabase } from '../service/supabaseClient';
import Swal from 'sweetalert2';
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Container,
  SimpleGrid,
  useColorModeValue,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

const Pemesanan = () => {
  const [lapangan, setLapangan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLapangan, setSelectedLapangan] = useState(null);
  const [bookingData, setBookingData] = useState({
    tanggal: '',
    jam_mulai: '',
    jam_selesai: '',
  });
  const [totalHarga, setTotalHarga] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure(); // UseDisclosure hook to manage modal state
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    fetchLapangan();
  }, []);

  const fetchLapangan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('lapangan').select('*');

      if (error) throw error;

      console.log('Fetched lapangan data:', data);
      setLapangan(data);
    } catch (error) {
      console.error('Error fetching lapangan:', error);
      setError('Terjadi kesalahan saat mengambil data lapangan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePesan = (lap) => {
    setSelectedLapangan(lap);
    setBookingData({ tanggal: '', jam_mulai: '', jam_selesai: '' });
    setTotalHarga(0);
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });

    // Calculate total price whenever any input changes
    calculateTotalHarga({ ...bookingData, [name]: value });
  };

  const calculateTotalHarga = (data) => {
    if (data.jam_mulai && data.jam_selesai && selectedLapangan) {
      const start = new Date(`2000-01-01T${data.jam_mulai}`);
      const end = new Date(`2000-01-01T${data.jam_selesai}`);
      const durationHours = (end - start) / (1000 * 60 * 60);
      const harga = Math.round(durationHours * selectedLapangan.harga_per_jam);
      setTotalHarga(harga);
    } else {
      setTotalHarga(0);
    }
  };

  const handleBookingSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
  
      const { data, error } = await supabase
        .from('pemesanan')
        .insert({
          ...bookingData,
          lapangan_id: selectedLapangan.id,
          user_id: user.id,
          status: 'pending',
          total_harga: totalHarga, // Pastikan ini sudah dihitung dengan benar
        })
        .select()
        .single();
  
      if (error) throw error;
  
      Swal.fire('Sukses!', 'Pemesanan berhasil', 'success');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      Swal.fire('Error!', error.message, 'error');
    }
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>{error}</Box>;

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h2" size="xl" textAlign="center">
            Pemesanan Lapangan
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {lapangan.map((lap) => (
              <Box
                key={lap.id}
                bg={cardBgColor}
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <VStack spacing={4} align="stretch">
                  {lap.image_url ? (
                    <Image
                      src={lap.image_url}
                      alt={lap.nama}
                      borderRadius="md"
                      objectFit="cover"
                      height="200px"
                      fallback={
                        <Box height="200px" bg="gray.300" borderRadius="md" />
                      }
                      onError={(e) => {
                        console.error(
                          'Error loading image for',
                          lap.nama,
                          ':',
                          e
                        );
                      }}
                    />
                  ) : (
                    <Box height="200px" bg="gray.300" borderRadius="md" />
                  )}
                  <Heading as="h3" size="md">
                    {lap.nama}
                  </Heading>
                  <Text>{lap.deskripsi}</Text>
                  <Text fontWeight="bold">
                    Harga: Rp {lap.harga_per_jam.toLocaleString('id-ID')} / jam
                  </Text>
                  <Button colorScheme="green" onClick={() => handlePesan(lap)}>
                    Pesan
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesan {selectedLapangan?.nama}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Tanggal</FormLabel>
                <Input
                  type="date"
                  name="tanggal"
                  value={bookingData.tanggal}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Jam Mulai</FormLabel>
                <Input
                  type="time"
                  name="jam_mulai"
                  value={bookingData.jam_mulai}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Jam Selesai</FormLabel>
                <Input
                  type="time"
                  name="jam_selesai"
                  value={bookingData.jam_selesai}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Text fontWeight="bold">
                Total Harga: Rp {totalHarga.toLocaleString('id-ID')}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleBookingSubmit}
              isDisabled={
                !bookingData.tanggal ||
                !bookingData.jam_mulai ||
                !bookingData.jam_selesai ||
                totalHarga === 0
              }
            >
              Pesan
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Pemesanan;
