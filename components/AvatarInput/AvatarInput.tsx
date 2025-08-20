import React, { useEffect, useState } from 'react';
import { Box, Input, Spinner, Tooltip, useDisclosure } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';
import StudioTranslations from '@/public/translations/Studio.translations.json';

import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '../Modal';
import { useToast } from '../Toast/useToast';
import { AvatarInputProps } from './AvatarInput.types';

export const AvatarInput: React.FC<AvatarInputProps> = ({
  onFileChange,
  value,
  avatarProps,
  ...inputProps
}) => {
  const [internalAvatarUrl, setInternalAvatarUrl] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const translate = useTranslate(StudioTranslations);

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setInternalAvatarUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof value === 'string') {
      setInternalAvatarUrl(value);
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0] || null;

    // 챗봇 아바타 파일 규격
    // 1. 파일 타입: png, jpg
    // 2. 파일 사이즈: 10MB
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: translate('avatar_file_type_error') as string,
          description: translate('avatar_file_type_description') as string,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: translate('avatar_file_size_error_title') as string,
          description: translate('avatar_file_size_error') as string,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setIsLoading(true);

      const objectUrl = URL.createObjectURL(file);
      setTimeout(() => {
        setInternalAvatarUrl(objectUrl);
        setIsLoading(false);
        onFileChange?.(file);

        // Reset the file input value so it can fire onChange for the same file again
        fileInput.value = '';
      }, 1000); // Simulate loading time
    } else {
      setInternalAvatarUrl(null);
      onFileChange?.(undefined);
    }
  };

  const clearAvatar = () => {
    setInternalAvatarUrl(null);
    onFileChange?.(undefined);
    onClose();
  };

  return (
    <Box position="relative" width="fit-content">
      <Input
        id="avatar-upload"
        type="file"
        accept="image/png, image/jpg"
        hidden
        onChange={handleFileChange}
        {...inputProps}
      />
      <Tooltip label={translate('avatar_upload_tooltip')} fontSize="sm">
        <Avatar
          size="xl"
          src={internalAvatarUrl || undefined}
          bg="gray.300"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.600"
          cursor="pointer"
          onClick={() => document.getElementById('avatar-upload')?.click()}
          {...avatarProps}
        />
      </Tooltip>
      {internalAvatarUrl && !isLoading && (
        <IconButton
          bgColor="danger.main"
          _hover={{ bgColor: 'danger.dark' }}
          aria-label={translate('avatar_remove_button_label') as string}
          icon={<Icon icon="IoClose" color="white" />}
          size="sm"
          position="absolute"
          top="-2"
          right="-2"
          colorScheme="red"
          cursor="pointer"
          onClick={onOpen}
        />
      )}
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0, 0, 0, 0.6)"
          borderRadius="full"
        >
          <Spinner size="lg" color="white" />
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent>
          <ModalHeader>{translate('avatar_remove_modal_title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{translate('avatar_remove_modal_body')}</ModalBody>
          <ModalFooter>
            <Button variant="tertiary" onClick={onClose} ml={3}>
              {translate('avatar_remove_modal_cancel')}
            </Button>
            <Button variant="danger" onClick={clearAvatar}>
              {translate('avatar_remove_modal_confirm')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

AvatarInput.displayName = 'AvatarInput';
