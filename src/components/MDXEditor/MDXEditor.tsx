'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
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

import type { MDXEditorProps } from './MDXEditor.types';

export const MDXEditor = forwardRef<
  BaseEditorProps & MDXEditorMethods,
  MDXEditorProps
>(({ containerProps, autoFocus = true, onError, ...rest }, ref) => {
  const [error, setError] = useState<string | null>(null);

  // 내부적으로 Editor 인스턴스를 참조하기 위한 로컬 ref
  const editorRef = useRef<BaseEditorProps & MDXEditorMethods>(null);

  // 부모 컴포넌트로 전달된 ref가 editorRef를 바라보도록 연결
  useImperativeHandle(ref, () => editorRef.current!, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only focus if clicking on the container itself, not on toolbar and table elements
    const target = e.target as HTMLElement;
    const isToolbarClick = target.closest('.mdxeditor-toolbar');
    const isTableClick = target.closest('table');
    const isPopupClick = target.closest('.mdxeditor-popup-container');

    if (!isToolbarClick && !isTableClick && !isPopupClick) {
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
      css={{
        ...containerProps?.css,
        '.mdxeditor': {
          width: '100%',
          minHeight: '300px',
          height: '100%',
          bg: 'white',
          display: 'flex',
          flexDirection: 'column',
        },
        '.mdxeditor-toolbar': {
          display: 'flex',
          gap: '8px',
          p: '8px',
          borderBottomWidth: '1px',
          bg: 'gray.50',
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
          padding: '16px',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flex: 1,
          height: '100%',

          'h1, h2, h3, h4, h5': {
            marginBottom: '2px',
            fontWeight: 'bold',
          },

          'h1:not(:first-child), h2:not(:first-child), h3:not(:first-child), h4:not(:first-child)':
            {
              marginTop: '4px',
            },

          h1: {
            fontSize: '3em',
          },
          h2: {
            fontSize: '2.5em',
          },
          h3: {
            fontSize: '1.75em',
          },
          h4: {
            fontSize: '1.44em',
          },
          h5: {
            fontSize: '1.2em',
          },

          'ol, ul': {
            marginTop: '8px',
            paddingInlineStart: '16px',
          },

          li: {
            lineHeight: '1.5',
            marginBottom: '8px',
          },

          blockquote: {
            borderLeftWidth: '4px',
            borderLeftColor: 'primary.light',
            bg: 'primary.lighter',
            pl: '16px',
            py: '8px',
            my: '16px',
            color: 'gray.800',
          },

          a: {
            color: 'primary.main',
            textDecoration: 'underline',
          },

          code: {
            fontFamily: 'mono',
            bg: 'gray.100',
            px: '4px',
            borderRadius: '6px',

            span: {
              bg: 'transparent',
            },
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
