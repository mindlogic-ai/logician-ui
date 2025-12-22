import { ReactNode, useState } from 'react';
import { Button, List } from '@chakra-ui/react';

import { FileItem } from '@/components/FileItem';
import { FileGroupProps } from '@/components/FileList/FileList.types';
import { IoChevronDownOutline } from '@/components/Icon';
import { Subtitle } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';

// Extended types for Chakra v3 compound components that need children
type ListRootProps = React.ComponentProps<typeof List.Root> & {
  children?: ReactNode;
};

// Cast List.Root to extended type that includes children
const ListRoot = List.Root as React.FC<ListRootProps>;

export const FileList = ({
  files,
  onFileDelete,
  onFileDownload,
  visibleCount = 3,
}: FileGroupProps) => {
  const [currentVisibleCount, setCurrentVisibleCount] = useState<number>(
    visibleCount ?? 3
  );
  const [deletingFileIds, setDeletingFileIds] = useState<Set<number | null>>(
    new Set()
  );
  const translate = useTranslate();
  const shouldShowLoadMoreButton = files && files.length > currentVisibleCount;

  const handleFileLoadMore = () => {
    setCurrentVisibleCount((prev) => prev + 3);
  };

  const handleFileDelete = async (file: FileGroupProps['files'][0]) => {
    if (!onFileDelete || deletingFileIds.has(file.id)) return;

    setDeletingFileIds((prev) => new Set(prev).add(file.id));

    try {
      await onFileDelete(file);
    } finally {
      setDeletingFileIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  };

  if (files?.length <= 0) return null;

  return (
    <ListRoot
      w="100%"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
    >
      {files?.slice(0, currentVisibleCount).map((file) => (
        <FileItem
          key={file.id}
          fileName={file.name}
          onFileDelete={onFileDelete ? () => handleFileDelete(file) : undefined}
          onFileDownload={
            onFileDownload && file.fileUrl
              ? () => onFileDownload?.(file)
              : undefined
          }
          border={0}
          borderBottom="1px solid"
          borderBottomColor="gray.50"
          progress={file.progress}
          error={file.error}
          fileSize={file.size}
          isDeleting={deletingFileIds.has(file.id)}
        />
      ))}
      {shouldShowLoadMoreButton && (
        <Button
          onClick={handleFileLoadMore}
          alignSelf="stretch"
          w="100%"
          variant="plain"
          display="flex"
          gap={1}
        >
          <Subtitle color="gray.600">
            {translate('see_more')} ({visibleCount}/{files.length})
          </Subtitle>
          <IoChevronDownOutline color="gray.600" />
        </Button>
      )}
    </ListRoot>
  );
};

FileList.displayName = 'FileList';
