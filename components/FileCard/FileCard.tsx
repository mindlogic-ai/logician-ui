import { CloseIcon } from '@chakra-ui/icons';
import { Box, Progress } from '@chakra-ui/react';

import { Card } from '@/components/Card';
import {
  errorStyles,
  fileContainerStyles,
  fileDeleteButtonStyles,
  fileNameStyles,
  fileProgressStyles,
  fileSecondBoxStyles,
} from '@/components/FileCard/FileCard.styles';
import { FileCardProps } from '@/components/FileCard/FileCard.types';
import { getFileType } from '@/components/FileCard/utils';
import { Icon, IconTypes } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { H4, Text } from '@/components/Typography';
import { formatFileSize } from '@/utils/formatFileSize';

export const FileCard = ({
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

  const getIconsType =
    getFileType(fileType) === 'image' ? IconTypes.FileImage : IconTypes.File;

  const detailColor = error ? errorStyles : {};

  return (
    <Card
      sx={{ ...fileContainerStyles, ...detailColor }}
      p={4}
      pb={0}
      {...rest}
    >
      <Box>
        <Box mb={3}>
          <Icon icon={getIconsType} boxSize="xl" />
        </Box>
        <H4 sx={fileNameStyles} maxW="400px">
          {fileName}
        </H4>
      </Box>
      <Box sx={fileSecondBoxStyles}>
        <Text mb={3} sx={{ ...detailColor }}>
          {formatFileSize(fileSize as number)}
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
