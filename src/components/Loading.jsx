import React from 'react';
import { Spinner, Center, Text, VStack } from '@chakra-ui/react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Center height="100vh">
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        />
        <Text fontSize="lg" color="gray.600">
          {message}
        </Text>
      </VStack>
    </Center>
  );
};

export default Loading;