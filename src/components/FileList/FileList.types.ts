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
  /**
   * Deal the rows in one after another as they mount — on first render, and
   * again for each batch revealed by "see more".
   *
   * Opt-in because a file list is often *edited* rather than displayed: a list
   * the reader is uploading into wants each new row to arrive on its own, not
   * behind six others.
   */
  stagger?: boolean;
}
