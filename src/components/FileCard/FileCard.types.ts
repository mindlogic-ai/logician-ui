import { CardProps } from '../Card/Card.types';

export type FileCardSize = 'fullWidth' | 'small';
export type FileType = 'image' | 'document';

export interface FileCardProps extends CardProps {
  fileName: string;
  size?: FileCardSize;
  fileType?: string;
  error?: boolean;
  handleFileDelete?: () => void;
  progress?: number;
  fileSize?: number;
}
