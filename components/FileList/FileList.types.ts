export interface FileItemData {
  error?: string;
  errorCode?: number | null;
  progress?: number;
  id: number | null;
  fileUrl?: string;
  name: string;
  isLoading?: boolean;
  timeStamp?: string;
  size?: number;
}

export interface FileGroupProps {
  files: FileItemData[];
  onFileDelete?: (file: FileItemData) => void;
  onFileDownload?: (file: FileItemData) => void;
  visibleCount?: number;
}
