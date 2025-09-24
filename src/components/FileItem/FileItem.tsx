import { Fragment } from 'react';
import { Box, Flex, useTheme } from '@chakra-ui/react';

import { FileItemProps } from '@/components/FileItem/FileItem.types';
import { Icon, IconTypes } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { ProgressBar } from '@/components/ProgressBar';
import { Subtext, Subtitle, Text } from '@/components/Typography';
import { formatFileSize } from '@/utils/formatFileSize';

import { Spinner } from '../Spinner';
import { Tooltip } from '../Tooltip';

export const FileItem = ({
  fileName,
  error,
  onFileDownload,
  onFileDelete,
  progress,
  fileSize,
  isDeleting = false,
  ...rest
}: FileItemProps) => {
  const theme = useTheme();
  const errorColor = 'danger.main';

  const isUploadingFile =
    !error && typeof progress === 'number' && progress >= 0 && progress < 100;
  const isFileUploadComplete = !progress || error || progress === 100;

  return (
    <Flex
      px={3}
      py={2}
      gap={2}
      justifyContent="space-between"
      alignItems="center"
      border="1px solid"
      borderColor="gray.200"
      w="100%"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '3px',
        backgroundColor: error ? errorColor : 'transparent',
      }}
      {...rest}
    >
      <Flex w="60%" alignItems="center" gap={2}>
        <Box minW={5}>
          <Icon
            icon={IconTypes.CiFileOn}
            color={error ? errorColor : 'gray.800'}
          />
        </Box>
        <Text isTruncated color={error ? errorColor : undefined}>
          {fileName}
        </Text>
      </Flex>
      <Flex align="center" gap={2} flex={1}>
        {error ? (
          <Flex w="100%" justify="flex-end" align="center" gap={2}>
            <Tooltip label={error} placement="top" shouldWrapChildren>
              <Icon icon="MdError" color={errorColor} />
            </Tooltip>
            {/* TODO: implement retry button */}
          </Flex>
        ) : (
          <Box w="100%">
            {isUploadingFile && (
              <Flex align="center" justify="flex-end" gap={2}>
                <Subtext>{progress}%</Subtext>
                <ProgressBar w="100%" minW={3} maxW={20} value={progress} />
                <Spinner size="xs" />
                <IconButton
                  aria-label={'remove uploading file button'}
                  onClick={onFileDelete}
                  icon={
                    <Icon
                      icon={IconTypes.IoClose}
                      color={theme.colors.gray[600]}
                      boxSize="lg"
                    />
                  }
                  size="xs"
                  isDisabled={isDeleting}
                />
              </Flex>
            )}
          </Box>
        )}
        {!isUploadingFile && isFileUploadComplete && (
          <Fragment>
            {fileSize && <Subtitle mr={4}>{formatFileSize(fileSize)}</Subtitle>}
            {onFileDownload && !error && (
              <IconButton
                aria-label={'download uploaded file button'}
                onClick={onFileDownload}
                icon={
                  <Icon
                    icon={IconTypes.LuDownload}
                    color={theme.colors.gray[800]}
                    boxSize="sm"
                  />
                }
                size="xs"
              />
            )}
            {onFileDelete && (
              <IconButton
                aria-label={'remove uploaded file button'}
                onClick={onFileDelete}
                icon={
                  isDeleting ? (
                    <Spinner size="xs" />
                  ) : (
                    <Icon icon={IconTypes.FaRegTrashAlt} boxSize="sm" />
                  )
                }
                size="xs"
                isDisabled={isDeleting}
              />
            )}
          </Fragment>
        )}
      </Flex>
    </Flex>
  );
};

FileItem.displayName = 'FileItem';
