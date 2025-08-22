'use client';

import { useRef } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor as Editor,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';
import './MDXEditor.css';

import { type MDXEditorProps } from './MDXEditor.types';

export function MDXEditor({
  containerProps,
  autoFocus = true,
  ...rest
}: MDXEditorProps) {
  const theme = useTheme();
  const editorRef = useRef<any>(null);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only focus if clicking on the container itself, not on toolbar elements
    const target = e.target as HTMLElement;
    const isToolbarClick = target.closest('.toolbar');

    if (!isToolbarClick && editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <Box {...containerProps}>
      <Box
        width="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        onClick={handleContainerClick}
        cursor="text"
        sx={{
          ...containerProps?.sx,
          '.mdxeditor': {
            width: '100%',
            minHeight: '300px',
            bg: theme.colors.white,
            display: 'flex',
            flexDirection: 'column',
          },
          '.toolbar': {
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
            minHeight: '100%',

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
        }}
      >
        <Editor
          ref={editorRef}
          contentEditableClassName="content-editable"
          // @ts-expect-error - overlayContainer prop may not be available in this version
          overlayContainer={
            typeof document !== 'undefined' ? document.body : undefined
          }
          autoFocus={autoFocus}
          plugins={[
            headingsPlugin({
              allowedHeadingLevels: [2, 3, 4, 5],
            }),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  {/* <CreateLink />
                  <InsertImage /> */}
                </>
              ),
            }),
          ]}
          {...rest}
        />
      </Box>
    </Box>
  );
}
