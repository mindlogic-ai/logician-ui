import React, { useRef } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { EditIcon } from '@chakra-ui/icons';
import { Box, Image, Input } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import { IconButton } from '@/components/IconButton';

export const EditableImage = ({ field }) => {
  const { values, setFieldValue } = useFormikContext();
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setFieldValue(field.name, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageUrl = values[field.name];

  return (
    <Box position="relative" display="inline-block">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Editable"
          boxSize="100px"
          objectFit="cover"
          borderRadius="full"
          border="1px solid"
          borderColor={'gray.200'}
        />
      ) : (
        <Box
          boxSize="100px"
          borderRadius="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px solid"
          borderColor="gray.200"
        >
          <FaRegImage style={{ fontSize: 40, color: 'black' }} />
        </Box>
      )}
      <IconButton
        aria-label="Edit Image"
        icon={<EditIcon />}
        position="absolute"
        size={field.iconSize || '24px'}
        bottom="0"
        right="0"
        onClick={handleEditClick}
        background="transparent"
      />
      <Input
        type="file"
        ref={fileInputRef}
        display="none"
        accept="image/*"
        onChange={handleImageChange}
      />
    </Box>
  );
};
