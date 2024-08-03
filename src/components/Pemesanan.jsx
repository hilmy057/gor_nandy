import React, { useState, useEffect } from 'react';
import { supabase } from '../service/supabaseClient';
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
  Select,
  Flex,
  Divider,
  useToast,
  Spinner,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('green.50', 'green.900');
  const cardBgColor = useColorModeValue('white', 'green.800');
  const modalBgColor = useColorModeValue('green.50', 'green.900');
  const toast = useToast();

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
          total_harga: totalHarga,
        })
        .select()
        .single();
  
      if (error) throw error;
  
      toast({
        title: 'Sukses!',
        description: 'Pemesanan berhasil',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bg={bgColor}>
        <Spinner size="xl" color="green.500" />
      </Box>
    );
  }

  if (error) return <Box bg={bgColor} p={5} color="red.500">{error}</Box>;

  return (
    <Box bg={bgColor} minH="100vh">
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" color="green.700">
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
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
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
                    />
                  ) : (
                    <Box height="200px" bg="gray.300" borderRadius="md" />
                  )}
                  <Heading as="h3" size="md" color="green.600">
                    {lap.nama}
                  </Heading>
                  <Text>{lap.deskripsi}</Text>
                  <Text fontWeight="bold" color="green.500">
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

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent bg={modalBgColor}>
          <ModalHeader borderBottomWidth="1px" mb={4} color="green.700">Pesan {selectedLapangan?.nama}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel color="green.600">Tanggal</FormLabel>
                <Input
                  type="date"
                  name="tanggal"
                  value={bookingData.tanggal}
                  onChange={handleInputChange}
                  bg="white"
                  borderColor="green.300"
                />
              </FormControl>
              <Flex width="100%" justify="space-between">
                <FormControl isRequired width="48%">
                  <FormLabel color="green.600">Jam Mulai</FormLabel>
                  <Select
                    name="jam_mulai"
                    value={bookingData.jam_mulai}
                    onChange={handleInputChange}
                    bg="white"
                    borderColor="green.300"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired width="48%">
                  <FormLabel color="green.600">Jam Selesai</FormLabel>
                  <Select
                    name="jam_selesai"
                    value={bookingData.jam_selesai}
                    onChange={handleInputChange}
                    bg="white"
                    borderColor="green.300"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
              <Divider borderColor="green.200" />
              <Text fontWeight="bold" fontSize="lg" color="green.700">
                Total Harga: Rp {totalHarga.toLocaleString('id-ID')}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter bg="green.100" borderBottomRadius="md">
            <Button
              colorScheme="green"
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
            <Button variant="outline" colorScheme="green" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Pemesanan;