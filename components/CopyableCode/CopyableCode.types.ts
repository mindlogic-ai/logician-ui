import { FlexProps } from '@chakra-ui/react';

export type CopyableCodeProps = {
  children: React.ReactNode;
  onCopy: () => void;
  containerProps?: FlexProps;
};
