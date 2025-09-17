'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Box, BoxProps, useTheme } from '@chakra-ui/react';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  imagePlugin,
  InsertTable,
  InsertThematicBreak,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor as Editor,
  MDXEditorMethods,
  MDXEditorProps as BaseEditorProps,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';
import './MDXEditor.css';

export interface MDXEditorProps extends Omit<BaseEditorProps, 'onError'> {
  containerProps?: BoxProps;
  onError?: (error: string) => void;
}
export const MDXEditor = forwardRef<
  BaseEditorProps & MDXEditorMethods,
  MDXEditorProps
>(({ containerProps, autoFocus = true, onError, ...rest }, ref) => {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);

  // 내부적으로 Editor 인스턴스를 참조하기 위한 로컬 ref
  const editorRef = useRef<BaseEditorProps & MDXEditorMethods>(null);

  // 부모 컴포넌트로 전달된 ref가 editorRef를 바라보도록 연결
  useImperativeHandle(ref, () => editorRef.current!, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only focus if clicking on the container itself, not on toolbar elements
    const target = e.target as HTMLElement;
    const isToolbarClick = target.closest('.toolbar');

    if (!isToolbarClick) {
      editorRef.current?.focus();
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleContainerClick}
      cursor="text"
      {...containerProps}
      sx={{
        ...containerProps?.sx,
        '.mdxeditor': {
          width: '100%',
          minHeight: '300px',
          height: '100%',
          bg: theme.colors.white,
          display: 'flex',
          flexDirection: 'column',
        },
        '.mdxeditor-toolbar': {
          display: 'flex',
          gap: theme.space[2],
          p: theme.space[2],
          borderBottomWidth: '1px',
          bg: theme.colors.gray[50],
          flexShrink: 0,
          cursor: 'default',
        },
        // Target the root contenteditable wrapper
        '[class*="_rootContentEditableWrapper_"]': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: '100%',
          overflow: 'auto',
        },
        // Target the actual contenteditable element
        '[contenteditable="true"]': {
          flex: 1,
          minHeight: '100%',
          outline: 'none',
        },
        // Target any intermediate wrapper elements
        '[class*="_contentEditable_"]': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        '.content-editable': {
          padding: theme.space[4],
          color: theme.colors.black,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.space[1.5],
          flex: 1,
          height: '100%',

          'h1, h2, h3, h4, h5': {
            marginBottom: theme.space[0.5],
            fontWeight: 'bold',
          },

          'h1:not(:first-child), h2:not(:first-child), h3:not(:first-child), h4:not(:first-child)':
            {
              marginTop: theme.space[1],
            },

          h1: {
            fontSize: theme.fontSizes.h1,
          },
          h2: {
            fontSize: theme.fontSizes.h2,
          },
          h3: {
            fontSize: theme.fontSizes.h3,
          },
          h4: {
            fontSize: theme.fontSizes.h4,
          },
          h5: {
            fontSize: theme.fontSizes.h5,
          },

          'ol, ul': {
            marginTop: theme.space[2],
            paddingInlineStart: theme.space[4],
          },

          li: {
            lineHeight: '1.5',
            marginBottom: theme.space[2],
          },

          blockquote: {
            borderLeftWidth: '4px',
            borderLeftColor: theme.colors.blue[200],
            bg: theme.colors.blue[50],
            pl: theme.space[4],
            py: theme.space[2],
            my: theme.space[4],
            color: theme.colors.gray[700],
          },

          a: {
            color: theme.colors.blue[500],
            textDecoration: 'underline',
          },

          code: {
            fontFamily: 'mono',
            bg: theme.colors.gray[100],
            px: theme.space[1],
            borderRadius: theme.radii.sm,
          },
        },
        '.mdxeditor-diff-source-wrapper': {
          overflow: 'auto',
        },
      }}
    >
      <Editor
        ref={editorRef}
        contentEditableClassName="content-editable"
        overlayContainer={
          typeof document !== 'undefined' ? document.body : undefined
        }
        autoFocus={autoFocus}
        onError={({ error }) => {
          setError(error);
          onError?.(error);
        }}
        plugins={[
          headingsPlugin({
            allowedHeadingLevels: [2, 3, 4, 5],
          }),
          linkPlugin(),
          listsPlugin(),
          imagePlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          diffSourcePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />

                <Separator />

                <BoldItalicUnderlineToggles />
                <CodeToggle />

                <Separator />

                <ListsToggle />

                <Separator />

                <BlockTypeSelect />

                <Separator />

                <InsertTable />

                <InsertThematicBreak />

                {/* <CreateLink />
                    <InsertImage /> */}

                {error && (
                  <DiffSourceToggleWrapper options={['rich-text', 'source']}>
                    <></>
                  </DiffSourceToggleWrapper>
                )}
              </>
            ),
          }),
        ]}
        {...rest}
      />
    </Box>
  );
});

MDXEditor.displayName = 'MDXEditor';
