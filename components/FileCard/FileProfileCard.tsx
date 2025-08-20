import { CloseIcon } from '@chakra-ui/icons';
import { Box, Progress } from '@chakra-ui/react';

import { Card } from '@/components/Card';
import { FileCardProps } from '@/components/FileCard/FileCard.types';
import {
  fileContainerStyles,
  fileDeleteButtonStyles,
  fileNameStyles,
  fileProgressStyles,
  fileSecondBoxStyles,
  getDetailStyles,
} from '@/components/FileCard/FileProfileCard.styles';
import { formatFileSize } from '@/components/FileCard/utils';
import { IconButton } from '@/components/IconButton';
import { H5, Text } from '@/components/Typography';

export const FileProfileCard = ({
  size = 'small',
  fileName,
  fileType,
  fileSize,
  error,
  handleFileDelete,
  progress,
  ...rest
}: FileCardProps) => {
  if (size !== 'small') return <div>TODO</div>;

  //TODO : style하고 같이 재 커스텀 필요
  return (
    <Card
      sx={{ ...fileContainerStyles, ...getDetailStyles(error) }}
      p={4}
      pb={0}
      {...rest}
    >
      <Box>
        <Box mb={3}></Box>
        <H5 sx={fileNameStyles} maxW="400px">
          {fileName}
        </H5>
      </Box>
      <Box sx={fileSecondBoxStyles}>
        <Text mb={3} sx={{ ...getDetailStyles(error) }}>
          {fileSize && formatFileSize(fileSize)}
        </Text>
      </Box>
      <Progress sx={fileProgressStyles} value={progress} />
      <IconButton
        size="sm"
        isRound
        sx={fileDeleteButtonStyles}
        aria-label="Delete file"
        onClick={handleFileDelete}
      >
        <CloseIcon boxSize="12px" />
      </IconButton>
    </Card>
  );
};
