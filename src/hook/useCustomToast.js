import React from 'react';
import { useToast } from '@chakra-ui/react';

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (title, description, status = 'success') => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  return {
    showSuccessToast: (title, description) => showToast(title, description, 'success'),
    showErrorToast: (title, description) => showToast(title, description, 'error'),
    showInfoToast: (title, description) => showToast(title, description, 'info'),
    showWarningToast: (title, description) => showToast(title, description, 'warning'),
  };
};