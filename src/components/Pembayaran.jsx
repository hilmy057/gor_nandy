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
} from '@chakra-ui/react';

const Pembayaran = () => {
  const [pemesanan, setPemesanan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedPemesanan, setSelectedPemesanan] = useState(null);
  const [buktiPembayaran, setBuktiPembayaran] = useState(null);
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const toast = useToast();

  useEffect(() => {
    fetchPemesanan();
  }, []);

  const fetchPemesanan = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user); // Log user

      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('pemesanan')
        .select(`
          *,
          lapangan (nama, harga_per_jam)
        `)
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      console.log('Fetched pemesanan:', data); // Log fetched data

      if (error) throw error;
      setPemesanan(data);
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

  const handleBayar = (pesan) => {
    setSelectedPemesanan(pesan);
    setIsModalOpen(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setBuktiPembayaran(file);
  };

  const handleConfirmPayment = async () => {
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
          status: 'paid',
          metode_pembayaran: selectedPaymentMethod,
          bukti_pembayaran: filePath
        })
        .eq('id', selectedPemesanan.id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Pembayaran Berhasil',
        description: 'Status pemesanan telah diperbarui',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setIsModalOpen(false);
      setSelectedPaymentMethod('');
      setBuktiPembayaran(null);
      fetchPemesanan(); // Refresh the list
    } catch (error) {
      console.error('Error updating pemesanan:', error);
      toast({
        title: 'Error',
        description: 'Gagal melakukan pembayaran',
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
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Pembayaran Pemesanan
          </Heading>
          {pemesanan.length === 0 ? (
            <Text textAlign="center" fontSize="lg">
              Tidak ada pemesanan yang perlu dibayar saat ini.
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
                    <Badge colorScheme={pesan.status === 'paid' ? 'green' : 'yellow'}>
                      {pesan.status === 'paid' ? 'Pembayaran Selesai' : 'Menunggu Pembayaran'}
                    </Badge>
                    <Button
                      colorScheme="green"
                      onClick={() => handleBayar(pesan)}
                      isDisabled={pesan.status === 'paid'}
                    >
                      {pesan.status === 'paid' ? 'Pembayaran Selesai' : 'Bayar Sekarang'}
                    </Button>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pilih Metode Pembayaran</ModalHeader>
          <ModalBody>
            <RadioGroup onChange={setSelectedPaymentMethod} value={selectedPaymentMethod}>
              <Stack direction="column">
                <Radio value="transfer_bank">Transfer Bank</Radio>
                <Radio value="qris">QRIS</Radio>
              </Stack>
            </RadioGroup>
            {selectedPaymentMethod === 'transfer_bank' && (
              <Box mt={4}>
                <Text>Silakan transfer ke rekening berikut:</Text>
                <Text>Bank XYZ: 1234-5678-9012</Text>
                <Text>Atas nama: PT Lapangan Futsal</Text>
              </Box>
            )}
            {selectedPaymentMethod === 'qris' && (
              <Box mt={4}>
                <Image src="https://via.placeholder.com/150" alt="QRIS Code" />
              </Box>
            )}
            <Box mt={4}>
              <Text mb={2}>Unggah Bukti Pembayaran:</Text>
              <Input type="file" onChange={handleFileUpload} accept="image/*" />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirmPayment}>
              Konfirmasi Pembayaran
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Pembayaran;