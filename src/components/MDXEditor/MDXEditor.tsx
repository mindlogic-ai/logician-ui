'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Box, useToken } from '@chakra-ui/react';
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

  // Resolve theme tokens to actual values
  const [space1, space2, space4] = useToken('spacing', ['1', '2', '4']);
  const [radiusSm] = useToken('radii', ['sm']);

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
        /**
         * Chakra v3 css prop styling notes:
         *
         * 1. All nested selectors require '&' prefix (e.g., '& .class', '& h1')
         * 2. Use full CSS property names (background, padding) instead of Chakra
         *    shorthand props (bg, p) in nested selectors
         * 3. Color values must be resolved via useToken(), not token strings
         * 4. Font sizes use responsive objects: { base: '2.4em', md: '3em' }
         * 5. List styles must be explicitly defined (listStyleType, etc.)
         *
         * These requirements differ from v2's sx prop, which was more implicit.
         * v3 prioritizes performance and explicitness over automatic handling.
         */
        ...containerProps?.css,
        '& .mdxeditor': {
          width: '100%',
          minHeight: '300px',
          height: '100%',
          background: 'var(--chakra-colors-bg-surface)',
          display: 'flex',
          flexDirection: 'column',
        },
        '& .mdxeditor-toolbar': {
          display: 'flex',
          gap: space2,
          padding: space2,
          borderBottomWidth: '1px',
          background: 'var(--chakra-colors-bg-subtle)',
          flexShrink: 0,
          cursor: 'default',
        },
        // Target the root contenteditable wrapper
        '& [class*="_rootContentEditableWrapper_"]': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: '100%',
          overflow: 'auto',
        },
        // Target the actual contenteditable element
        '& [contenteditable="true"]': {
          flex: 1,
          minHeight: '100%',
          outline: 'none',
        },
        // Target any intermediate wrapper elements
        '& [class*="_contentEditable_"]': {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        '& .content-editable': {
          padding: space4,
          color: 'var(--chakra-colors-fg-default)',
          display: 'flex',
          flexDirection: 'column',
          gap: radiusSm,
          flex: 1,
          height: '100%',

          '& h1, & h2, & h3, & h4, & h5': {
            marginBottom: '2px',
            fontWeight: 'bold',
          },

          '& h1:not(:first-child), & h2:not(:first-child), & h3:not(:first-child), & h4:not(:first-child)':
            {
              marginTop: space1,
            },

          /**
           * Font sizes - Cannot be tokenized due to responsive objects
           *
           * Unlike spacing/radii/colors, fontSize values here are responsive objects
           * { base: '2.4em', md: '3em' } which cannot be stored as regular tokens
           * in Chakra v3. Only textStyles support responsive values, but we cannot
           * extract just the fontSize from textStyles using useToken().
           *
           * These values match theme/index.ts textStyles exactly and must be
           * manually synchronized when updating the theme:
           * - h1: { base: '2.4em', md: '3em' }
           * - h2: { base: '2em', md: '2.5em' }
           * - h3: { base: '1.5em', md: '1.75em' }
           * - h4: { base: '1.25em', md: '1.44em' }
           * - h5: { base: '1.1em', md: '1.2em' }
           */
          '& h1': {
            fontSize: { base: '2.4em', md: '3em' },
          },
          '& h2': {
            fontSize: { base: '2em', md: '2.5em' },
          },
          '& h3': {
            fontSize: { base: '1.5em', md: '1.75em' },
          },
          '& h4': {
            fontSize: { base: '1.25em', md: '1.44em' },
          },
          '& h5': {
            fontSize: { base: '1.1em', md: '1.2em' },
          },

          /**
           * List styling - IMPORTANT: v3 requires explicit list-style properties
           *
           * In Chakra v2, the `sx` prop automatically preserved browser default list styles.
           * In Chakra v3, the `css` prop is more explicit and performant, but requires
           * manual specification of list styles to override MDXEditor's CSS resets.
           *
           * Required properties:
           * - listStyleType: 'disc' (ul) or 'decimal' (ol) - Shows bullets/numbers
           * - listStylePosition: 'outside' - Places markers outside content box
           * - display: 'list-item' (on li) - Ensures proper list item rendering
           *
           * Why this changed: v3 optimized for speed by removing automatic style inference,
           * requiring more explicit style declarations.
           */
          '& ul': {
            marginTop: space2,
            paddingInlineStart: space4,
            listStyleType: 'disc',
            listStylePosition: 'outside',
          },

          '& ol': {
            marginTop: space2,
            paddingInlineStart: space4,
            listStyleType: 'decimal',
            listStylePosition: 'outside',
          },

          '& li': {
            lineHeight: '1.5',
            marginBottom: space2,
            display: 'list-item',
          },

          '& blockquote': {
            borderLeftWidth: '4px',
            borderLeftColor: 'var(--chakra-colors-primary-light)',
            background: 'var(--chakra-colors-primary-lighter)',
            paddingLeft: space4,
            paddingBlock: space2,
            marginBlock: space4,
            color: 'var(--chakra-colors-fg-muted)',
          },

          '& a': {
            color: 'var(--chakra-colors-primary-main)',
            textDecoration: 'underline',
          },

          '& code': {
            fontFamily: 'mono',
            background: 'var(--chakra-colors-bg-muted)',
            paddingInline: space1,
            borderRadius: radiusSm,

            '& span': {
              background: 'transparent',
            },
          },
        },
        '& .mdxeditor-diff-source-wrapper': {
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
