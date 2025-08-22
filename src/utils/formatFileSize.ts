export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const size = sizeInBytes / Math.pow(1024, i);

  // Format with or without decimal places depending on whether the size is an integer
  const formattedSize = Number.isInteger(size)
    ? size.toString()
    : size.toFixed(2);

  return `${formattedSize}${units[i]}`;
}
