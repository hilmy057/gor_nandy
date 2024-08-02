import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, green.400, green.600)"
            backgroundClip="text"
          >
            Oops!
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Terjadi kesalahan
          </Text>
          <Text color={'gray.500'} mb={6}>
            Maaf atas ketidaknyamanannya. Silakan coba muat ulang halaman atau hubungi dukungan jika masalah berlanjut.
          </Text>

          <Button
            colorScheme="green"
            bgGradient="linear(to-r, green.400, green.500, green.600)"
            color="white"
            variant="solid"
            onClick={() => window.location.reload()}
          >
            Muat Ulang Halaman
          </Button>
        </Box>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;