import React from 'react';
import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  AspectRatio,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  return (
    <Box pt={{ base: 20, md: 28 }} pb={8}>
      <Container maxW="container.xl">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="2xl">
            Kontak <Text as="span" color="green.500">Kami</Text>
          </Heading>
          <Text color="gray.600" mb={8}>
            Hubungi kami jika ada saran yang ingin di sampaikan
          </Text>
          
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            {/* Map Section */}
            <Box flex={1}>
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65638779785!2d107.02311644562902!3d-6.3039139783670815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b2918f7fedd%3A0x1c58797d68859e2e!2sKarawang%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1658148948159!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </AspectRatio>
            </Box>

            {/* Contact Form */}
            <VStack flex={1} spacing={4} as="form">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaUser color="gray.300" />} />
                  <Input type="text" placeholder="Nama" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaEnvelope color="gray.300" />} />
                  <Input type="email" placeholder="Email" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FaPhone color="gray.300" />} />
                  <Input type="tel" placeholder="No Telp" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Textarea placeholder="Pesan" />
              </FormControl>
              <Button colorScheme="green" width="full">
                Kirim Pesan
              </Button>
            </VStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact;