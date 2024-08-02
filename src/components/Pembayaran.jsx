import React, { useState, useEffect } from 'react';
import { supabase } from '../service/supabaseClient';
import Confetti from 'react-confetti';
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Container,
  SimpleGrid,
  useColorModeValue,
  useToast,
  Spinner,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  Stack,
  Input,
  Image,
  Divider,
  FormLabel,
  Icon,
} from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, onConfirm, selectedPaymentMethod, setSelectedPaymentMethod }) => {
  const [buktiPembayaran, setBuktiPembayaran] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setBuktiPembayaran(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="xl" bg="green.50">
        <ModalHeader bg="green.500" color="white" borderTopRadius="xl" py={6} textAlign="center" fontSize="2xl">
          Pilih Metode Pembayaran
        </ModalHeader>
        <ModalBody p={8}>
          <VStack spacing={8} align="stretch">
            <RadioGroup onChange={setSelectedPaymentMethod} value={selectedPaymentMethod}>
              <Stack direction="column" spacing={4}>
                <Radio value="transfer_bank" colorScheme="green" size="lg">
                  <Text fontSize="lg" fontWeight="medium">Transfer Bank</Text>
                </Radio>
                <Radio value="qris" colorScheme="green" size="lg">
                  <Text fontSize="lg" fontWeight="medium">QRIS</Text>
                </Radio>
              </Stack>
            </RadioGroup>
            <Divider borderColor="green.200" />
            {selectedPaymentMethod === 'transfer_bank' && (
              <Box bg="white" p={6} borderRadius="md" boxShadow="md" border="1px" borderColor="green.200">
                <Text fontSize="lg" fontWeight="bold" mb={3} color="green.600">Silakan transfer ke rekening berikut:</Text>
                <Text fontSize="md">Bank XYZ: 1234-5678-9012</Text>
                <Text fontSize="md">Atas nama: PT Lapangan Futsal</Text>
              </Box>
            )}
            {selectedPaymentMethod === 'qris' && (
              <Box bg="white" p={6} borderRadius="md" boxShadow="md" alignItems="center" display="flex" flexDirection="column" border="1px" borderColor="green.200">
                <Image src="https://via.placeholder.com/150" alt="QRIS Code" borderRadius="md" boxSize="200px" />
                <Text mt={4} fontSize="lg" fontWeight="bold" color="green.600">Scan QRIS untuk membayar</Text>
              </Box>
            )}
            <Box>
              <FormLabel htmlFor="file-upload" fontWeight="bold" fontSize="lg" color="green.600">
                Unggah Bukti Pembayaran:
              </FormLabel>
              <Button
                as="label"
                htmlFor="file-upload"
                colorScheme="green"
                variant="outline"
                leftIcon={<Icon as={FaUpload} />}
                cursor="pointer"
                mb={2}
                _hover={{ bg: 'green.100' }}
              >
                Pilih File
              </Button>
              <Input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                accept="image/*"
                display="none"
              />
              {buktiPembayaran && (
                <Text fontSize="sm" color="green.600">
                  File terpilih: {buktiPembayaran.name}
                </Text>
              )}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter bg="green.100" borderBottomRadius="xl">
          <Button colorScheme="green" mr={3} onClick={() => onConfirm(buktiPembayaran)}>
            Konfirmasi Pembayaran
          </Button>
          <Button variant="outline" colorScheme="green" onClick={onClose}>Batal</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Pembayaran = () => {
  const [pemesanan, setPemesanan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedPemesanan, setSelectedPemesanan] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const bgColor = useColorModeValue('green.50', 'green.900');
  const cardBgColor = useColorModeValue('white', 'green.800');
  const toast = useToast();

  useEffect(() => {
    fetchPemesanan();
  }, []);


  const fetchPemesanan = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('pemesanan')
        .select(`
          *,
          lapangan (nama, harga_per_jam)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Ensure all pemesanan have a valid status
      const updatedPemesanan = data.map(pesan => ({
        ...pesan,
        status: pesan.status || 'belum_dibayar'
      }));

      setPemesanan(updatedPemesanan);
    } catch (error) {
      console.error('Error fetching pemesanan:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengambil data pemesanan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'berhasil':
        return 'green';
      case 'menunggu_konfirmasi':
        return 'yellow';
      case 'belum_dibayar':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'berhasil':
        return 'Pembayaran Berhasil';
      case 'menunggu_konfirmasi':
        return 'Menunggu Konfirmasi';
      case 'belum_dibayar':
        return 'Belum Dibayar';
      default:
        return 'Menunggu Pembayaran';
    }
  };

  const handleBayar = (pesan) => {
    setSelectedPemesanan(pesan);
    setIsModalOpen(true);
  };

  const handleConfirmPayment = async (buktiPembayaran) => {
    if (!selectedPaymentMethod) {
      toast({
        title: 'Error',
        description: 'Silakan pilih metode pembayaran',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!buktiPembayaran) {
      toast({
        title: 'Error',
        description: 'Silakan unggah bukti pembayaran',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const fileExt = buktiPembayaran.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${selectedPemesanan.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('buktipbyr')
        .upload(filePath, buktiPembayaran);

      if (uploadError) throw uploadError;

      const { data, error } = await supabase
        .from('pemesanan')
        .update({ 
          status: 'menunggu_konfirmasi',
          metode_pembayaran: selectedPaymentMethod,
          bukti_pembayaran: filePath
        })
        .eq('id', selectedPemesanan.id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Pembayaran Berhasil Diunggah',
        description: 'Menunggu konfirmasi dari admin',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setIsModalOpen(false);
      setSelectedPaymentMethod('');
      fetchPemesanan(); // Refresh the list

      // Trigger confetti effect
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    } catch (error) {
      console.error('Error updating pemesanan:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengunggah pembayaran',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh">
      {showConfetti && <Confetti />}
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Pembayaran Pemesanan
          </Heading>
          {pemesanan.length === 0 ? (
            <Text textAlign="center" fontSize="lg">
              Tidak ada data pemesanan saat ini.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {pemesanan.map((pesan) => (
                <Box
                  key={pesan.id}
                  bg={cardBgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <VStack spacing={3} align="stretch">
                    <Heading as="h3" size="md">
                      {pesan.lapangan.nama}
                    </Heading>
                    <Text>
                      <strong>Tanggal:</strong> {new Date(pesan.tanggal).toLocaleDateString('id-ID')}
                    </Text>
                    <Text>
                      <strong>Waktu:</strong> {pesan.jam_mulai} - {pesan.jam_selesai}
                    </Text>
                    <Text>
                      <strong>Harga per Jam:</strong> Rp {pesan.lapangan.harga_per_jam.toLocaleString('id-ID')}
                    </Text>
                    <Text>
                      <strong>Total Harga:</strong> Rp {pesan.total_harga.toLocaleString('id-ID')}
                    </Text>
                    <Badge colorScheme={getStatusColor(pesan.status)}>
                      {getStatusText(pesan.status)}
                    </Badge>
                    <Button
                      colorScheme={pesan.status === 'berhasil' ? 'green' : 'blue'}
                      onClick={() => handleBayar(pesan)}
                      isDisabled={pesan.status === 'berhasil' || pesan.status === 'menunggu_konfirmasi'}
                    >
                      {pesan.status === 'berhasil' ? 'Berhasil' : 
                       pesan.status === 'menunggu_konfirmasi' ? 'Menunggu Konfirmasi' : 'Bayar Sekarang'}
                    </Button>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPayment}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
      />
    </Box>
  );
};

export default Pembayaran;
