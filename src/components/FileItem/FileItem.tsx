import { Fragment } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { FileItemProps } from '@/components/FileItem/FileItem.types';
import {
  CiFileOn,
  FaRegTrashAlt,
  IoClose,
  LuDownload,
  MdError,
} from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { ProgressBar } from '@/components/ProgressBar';
import { Subtext, Subtitle, Text } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';
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
  isDownloading = false,
  ...rest
}: FileItemProps) => {
  const translate = useTranslate();
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
      borderColor="border.subtle"
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
          <CiFileOn color={error ? errorColor : 'fg.muted'} />
        </Box>
        <Text truncate color={error ? errorColor : undefined}>
          {fileName}
        </Text>
      </Flex>
      <Flex align="center" gap={2} flex={1}>
        {error ? (
          <Flex w="100%" justify="flex-end" align="center" gap={2}>
            <Tooltip content={error} placement="top">
              <MdError color={errorColor} />
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
                  size="2xs"
                  disabled={isDeleting}
                  colorPalette="neutral"
                  variant="ghost"
                >
                  <IoClose color="fg.subtle" boxSize="md" />
                </IconButton>
              </Flex>
            )}
          </Box>
        )}
        {!isUploadingFile && isFileUploadComplete && (
          <Fragment>
            {fileSize && <Subtitle mr={4}>{formatFileSize(fileSize)}</Subtitle>}
            {onFileDownload && !error && (
              <>
                {isDownloading ? (
                  <Tooltip content={translate('downloading')} placement="top">
                    <Spinner size="xs" />
                  </Tooltip>
                ) : (
                  <Tooltip content={translate('download')} placement="top">
                    <IconButton
                      aria-label={translate('download') as string}
                      onClick={onFileDownload}
                      size="2xs"
                      colorPalette="neutral"
                      variant="ghost"
                    >
                      <LuDownload color="fg.muted" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
            {onFileDelete && (
              <>
                {isDeleting ? (
                  <Tooltip content={translate('deleting')} placement="top">
                    <Spinner size="xs" />
                  </Tooltip>
                ) : (
                  <Tooltip content={translate('delete')} placement="top">
                    <IconButton
                      aria-label={translate('delete') as string}
                      onClick={onFileDelete}
                      size="2xs"
                      colorPalette="neutral"
                      variant="ghost"
                    >
                      <FaRegTrashAlt boxSize="sm" color="fg.muted" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
          </Fragment>
        )}
      </Flex>
    </Flex>
  );
};

FileItem.displayName = 'FileItem';
