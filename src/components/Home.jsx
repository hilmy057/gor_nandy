import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Flex, VStack, Heading, Button, Image } from '@chakra-ui/react';

const Home = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <Box position="relative" height="100vh" fontFamily="Open Sans">
      {/* Dark Overlay */}
      <Box position="absolute" inset="0" bg="blackAlpha.500" zIndex={10} />
      
      {/* Background Image */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/courted.jpg"
          alt="Stadium"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </motion.div>
      
      {/* Content Overlay */}
      <Flex
        position="relative"
        zIndex={20}
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* Main Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <VStack spacing={4} textAlign="center" color="white">
            <Heading as="h1" size="4xl" color="emerald.400">
              Sehatkan Dirimu
            </Heading>
            <Heading as="h2" size="2xl" color="green.300">
              Dengan Berolahraga
            </Heading>
            <Heading as="h3" size="xl" color="green.200" mb={8}>
              di Gor Nandy
            </Heading>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleButtonClick}
                colorScheme="green"
                size="lg"
                fontSize="xl"
                px={6}
                py={3}
                borderRadius="full"
              >
                Pesan Sekarang
              </Button>
            </motion.div>
          </VStack>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default Home;