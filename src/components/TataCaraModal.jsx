import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const TataCaraModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="green.500">Tata Cara Pemesanan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text>
              Ikuti langkah-langkah berikut untuk memesan fasilitas di Gor Nandy:
            </Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>
                <Text>
                  <strong>Pilih Fasilitas:</strong> Tentukan fasilitas olahraga yang ingin Anda gunakan (misalnya: lapangan basket, futsal, atau badminton).
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>Pilih Jadwal:</strong> Lihat ketersediaan jadwal dan pilih waktu yang sesuai dengan keinginan Anda.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>Isi Formulir Pemesanan:</strong> Lengkapi formulir pemesanan dengan informasi yang diperlukan, seperti nama, kontak, dan jumlah peserta.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>Konfirmasi Pemesanan:</strong> Periksa kembali detail pemesanan Anda dan konfirmasi jika sudah benar.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>Pembayaran:</strong> Lakukan pembayaran sesuai dengan metode yang tersedia (transfer bank, e-wallet, dll).
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>Terima Konfirmasi:</strong> Setelah pembayaran berhasil, Anda akan menerima konfirmasi pemesanan melalui email atau SMS.
                </Text>
              </ListItem>
            </UnorderedList>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TataCaraModal;