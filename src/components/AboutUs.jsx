import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, VStack, Heading, Text, Container, SimpleGrid, Center } from '@chakra-ui/react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const AboutUs = () => {
  return (
    <Box position="relative" minH="100vh" bgImage="url('/courted.jpg')" bgSize="cover" bgPosition="center" fontFamily="Open Sans">
      <Box position="absolute" inset="0" bg="green.900" opacity={0.7} />
      
      <Flex position="relative" zIndex={10} alignItems="center" justifyContent="center" minH="100vh" px={4} py={16}>
        <MotionBox
          bg="white"
          bgOpacity={0.9}
          p={8}
          borderRadius="lg"
          maxW="4xl"
          mx="auto"
          textAlign="center"
          boxShadow="2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MotionHeading
            as="h1"
            fontSize="4xl"
            fontWeight="bold"
            mb={8}
            color="green.700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Tentang Kami
          </MotionHeading>
          
          <VStack spacing={8} color="gray.800">
            <MotionHeading
              as="h2"
              fontSize="2xl"
              fontWeight="semibold"
              mb={4}
              color="green.600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Kenapa Memilih Kami?
            </MotionHeading>
            
            <MotionText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Sport Center adalah pusat olahraga premium yang menyediakan fasilitas terbaik dan layanan
              penyewaan lapangan untuk berbagai jenis olahraga. Kami berkomitmen untuk menciptakan
              lingkungan yang mendukung gaya hidup sehat dan aktif bagi semua kalangan.
            </MotionText>
            
            <MotionText
              mt={4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Kami menawarkan beragam lapangan berkualitas tinggi untuk berbagai olahraga populer,
              termasuk sepak bola, futsal, tenis, basket, dan voli. Setiap lapangan dilengkapi dengan
              fasilitas modern dan perawatan rutin untuk menjamin pengalaman olahraga yang optimal.
            </MotionText>
            
            <MotionBox
              mt={8}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <SimpleGrid columns={3} spacing={4} justifyContent="center">
                <Feature icon="🏆" text="Fasilitas Berkualitas" />
                <Feature icon="🔧" text="Perawatan Rutin" />
                <Feature icon="🤝" text="Layanan Ramah" />
              </SimpleGrid>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Flex>
    </Box>
  );
}

const Feature = ({ icon, text }) => (
  <Center flexDirection="column">
    <Text fontSize="4xl" mb={2}>{icon}</Text>
    <Text fontSize="sm" fontWeight="semibold" color="green.700">{text}</Text>
  </Center>
);

export default AboutUs;
