import { FlexProps } from '@chakra-ui/react';

export interface FileItemProps extends FlexProps {
  fileName: string;
  error?: string;
  onFileDownload?: () => void;
  onFileDelete?: () => void;
  progress?: number;
  fileSize?: number; // in bytes
  isDeleting?: boolean;
  isDownloading?: boolean;
}
