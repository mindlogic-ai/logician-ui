import { BoxProps } from '@chakra-ui/react';
import { MDXEditorProps as BaseEditorProps } from '@mdxeditor/editor';

export interface MDXEditorProps extends Omit<BaseEditorProps, 'onError'> {
  containerProps?: BoxProps;
  onError?: (error: string) => void;
}
