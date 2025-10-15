import { ChangeEventHandler, forwardRef } from 'react';
import { Box, Flex, Input, useTheme } from '@chakra-ui/react';

import { Upload } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { Text } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';

import { FileInputProps } from './FileInput.types';

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      fileInputLabel,
      containerStyle = {},
      bgImage,
      onChange,
      isLoading,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const translate = useTranslate();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange(event.currentTarget.files);
    };

    return (
      <Flex
        role="button"
        w="100%"
        h="100%"
        maxH={32}
        flexDir="column"
        align="center"
        justify="center"
        border="1px dashed"
        borderColor="gray.500"
        position="relative"
        overflow="hidden"
        borderRadius="md"
        {...containerStyle}
      >
        <label
          role="group"
          style={{ width: '100%', height: '100%', cursor: 'pointer' }}
        >
          {bgImage && (
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              backgroundImage={bgImage}
              backgroundSize="cover"
              backgroundPosition="center"
              filter="grayscale(50%) brightness(80%)"
              zIndex="-1"
            />
          )}
          <Input
            type="file"
            hidden
            ref={ref} // ref 전달
            onChange={handleChange}
            {...rest}
          />
          <Flex
            w="100%"
            h="100%"
            p={7}
            flexDir="column"
            justify="center"
            align="center"
            bgColor={`${theme.colors.white}da`}
            opacity={bgImage ? 0 : 1}
            transition="ease-in"
            _groupHover={{ opacity: 1 }} // Set opacity to 1 on parent hover
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <Flex w="100%" flexDir="column" align="center" justify="center">
                <Box
                  borderRadius="lg"
                  bgColor={bgImage ? 'transparent' : 'gray.50'}
                  p={3}
                  mb={1}
                  w="fit-content"
                >
                  <Upload
                    color={
                      bgImage ? theme.colors.gray[1200] : theme.colors.gray[800]
                    }
                  />
                </Box>
                <Text
                  color={
                    bgImage ? theme.colors.gray[1200] : theme.colors.gray[800]
                  }
                >
                  {fileInputLabel || translate('upload_your_file')}
                </Text>
              </Flex>
            )}
          </Flex>
        </label>
      </Flex>
    );
  }
);

FileInput.displayName = 'FileInput';
