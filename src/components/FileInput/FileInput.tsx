import { ChangeEventHandler, forwardRef } from 'react';
import { Box, Flex, Input } from '@chakra-ui/react';

import { UploadIcon } from '@/components/Icon';
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
    const translate = useTranslate();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange(event.currentTarget.files);
    };

    return (
      // No `role="button"` on this wrapper. It is not a button — the `<label>`
      // inside is what activates the file input — and claiming the role put an
      // interactive element inside another (axe `nested-interactive`), which is
      // a state screen readers have no sensible way to announce
      // (KWCAG 2.1 5.4.2.1 웹 애플리케이션 접근성 준수).
      <Flex
        w="100%"
        h="100%"
        maxH={32}
        flexDir="column"
        align="center"
        justify="center"
        border="1px dashed"
        borderColor="border.default"
        position="relative"
        overflow="hidden"
        borderRadius="md"
        {...containerStyle}
      >
        {/* `className="group"`, not `role="group"`. The role was doing nothing for
            assistive tech (a `<label>` may not be a group — axe
            `aria-allowed-role`) and nothing for the hover effect either: Chakra's
            `_groupHover` compiles to `.group:hover &`, so it needs the CLASS.
            The reveal-on-hover below has therefore never fired. */}
        <label
          className="group"
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
            bgColor="color-mix(in srgb, var(--chakra-colors-bg-surface) 85%, transparent)"
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
                  bgColor={bgImage ? 'transparent' : 'bg.muted'}
                  p={3}
                  mb={2}
                  w="fit-content"
                >
                  <UploadIcon color={bgImage ? 'fg.default' : 'fg.subtle'} />
                </Box>
                <Text color={bgImage ? 'fg.default' : 'fg.subtle'}>
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
