import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Heading,
  Button,
  Grid,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Container,
  Badge,
} from '@chakra-ui/react';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({});
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const getNextSevenDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      return date;
    });
  };

  const fetchScheduleData = async () => {
    const response = await fetch('/api/schedule');
    const data = await response.json();
    setScheduleData(data);
  };

  useEffect(() => {
    setSelectedDate(new Date());
    fetchScheduleData();
    const intervalId = setInterval(fetchScheduleData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const isBooked = (court, hour) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return scheduleData[court]?.[dateString]?.includes(hour) || false;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('green.700', 'green.200');

  return (
    <Box minH="100vh" bg={bgColor} py={12} px={4} mt="60px">
      <Container maxW="7xl">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h1" size="xl" textAlign="center" color={headingColor} mb={8}>
            Jadwal Lapangan
          </Heading>
        </MotionBox>

        <HStack spacing={2} overflowX="auto" mb={6} justifyContent="center">
          {getNextSevenDays().map((date) => (
            <MotionButton
              key={date.toISOString()}
              size="sm"
              variant={selectedDate.toDateString() === date.toDateString() ? 'solid' : 'outline'}
              colorScheme="green"
              onClick={() => setSelectedDate(date)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formatDate(date)}
            </MotionButton>
          ))}
        </HStack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
          {['Lapangan A', 'Lapangan B'].map((court) => (
            <MotionBox
              key={court}
              bg={cardBgColor}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading as="h2" size="lg" bg="green.500" color="white" p={4}>
                {court}
              </Heading>
              <VStack spacing={2} align="stretch" p={4}>
                {hours.map((hour) => (
                  <HStack key={hour} justify="space-between" py={2} borderBottomWidth={1} borderColor="gray.200" _last={{ borderBottomWidth: 0 }}>
                    <Text>{hour}</Text>
                    <Badge
                      colorScheme={isBooked(court, hour) ? 'red' : 'green'}
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {isBooked(court, hour) ? 'Terisi' : 'Tersedia'}
                    </Badge>
                  </HStack>
                ))}
              </VStack>
            </MotionBox>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Schedule;
