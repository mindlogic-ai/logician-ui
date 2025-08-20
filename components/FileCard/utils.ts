import { File } from 'buffer';

export const getFileType = fileType => {
  if (fileType?.startsWith('image/')) {
    return 'image';
  } else {
    return 'file';
  }
};

export const formatFileData = (
  file: File,
  error: boolean,
  progress: number,
) => {
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    progress,
    error,
    timeStamp: new Date().toISOString(),
  };
};

export const generateUniqueName = (name: string) => {
  const timestamp = new Date().getTime();
  const nameParts = name.split('.');
  const extension = nameParts.length > 1 ? nameParts.pop() : '';
  const baseName = nameParts.join('.');
  return `${baseName}_${timestamp}${extension ? '.' + extension : ''}`;
};
