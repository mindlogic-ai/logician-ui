import ReactMarkdown from 'react-markdown';
import { Box } from '@chakra-ui/react';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkFlexibleMarkers from 'remark-flexible-markers';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { formatForMarkdown } from '@/utils/formatTextForMarkdown';

import 'katex/dist/katex.min.css'; // Import KaTeX CSS

import { Code } from '../Code';
import { InlineCode } from '../InlineCode';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '../Table';
import { H1, H2, H3, H4, H5, Link, Subtitle, Text } from '../Typography';
import MarkdownStyles from './Markdown.module.css';
import { MarkdownProps } from './Markdown.types';

// Simple wrapper components to avoid type issues
const H1Wrapper = (props: any) => <H1 {...props} />;
const H2Wrapper = (props: any) => <H2 {...props} />;
const H3Wrapper = (props: any) => <H3 {...props} />;
const H4Wrapper = (props: any) => <H4 {...props} />;
const H5Wrapper = (props: any) => <H5 {...props} />;
const SubtitleWrapper = (props: any) => <Subtitle {...props} />;
const TheadWrapper = (props: any) => <Thead {...props} />;
const TbodyWrapper = (props: any) => <Tbody {...props} />;
const TrWrapper = (props: any) => <Tr {...props} />;
const TdWrapper = (props: any) => <Td {...props} />;
const ThWrapper = (props: any) => <Th {...props} />;

// Prepare base components
export const baseMarkdownComponents = {
  h1: H1Wrapper,
  h2: H2Wrapper,
  h3: H3Wrapper,
  h4: H4Wrapper,
  h5: H5Wrapper,
  h6: SubtitleWrapper,
  // The key fix: instead of trying to unwrap pre/code combinations,
  // we customize just the code element to detect if it's a code block
  code: ({ inline, className, children, ...props }: any) => {
    // If it's inline code (no language class), use InlineCode component
    if (inline || !className) {
      return <InlineCode {...props}>{children}</InlineCode>;
    }

    // For code blocks, use the Code component with language
    const language = className.match(/language-(.*)/)?.[1];
    return (
      <Code
        language={language}
        onCopy={(textToCopy: string) => {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              console.log('Text copied to clipboard');
            })
            .catch(err => {
              console.error('Could not copy text to clipboard:', err);
            });
        }}
        containerProps={{ mb: 4, className }}
        {...props}
      >
        {children}
      </Code>
    );
  },
  // Make the pre tag a no-op that just renders children
  pre: ({ children }: any) => <Box>{children}</Box>,
  p: (props: any) => <Text color="inherit" {...props} />,
  a: ({ style, ...rest }: any) => (
    //  `children` should be inside ...rest
    <Link target="_blank" {...rest} />
  ),
  ol: ({ style, ...rest }: any) => (
    <ol
      style={{ paddingInlineStart: '22px', color: 'inherit', ...style }}
      {...rest}
    />
  ),
  ul: ({ style, ...rest }: any) => (
    <ul
      style={{ paddingInlineStart: '22px', color: 'inherit', ...style }}
      {...rest}
    />
  ),
  img: ({ style, ...rest }: any) => (
    <img style={{ maxWidth: '100%', ...style }} alt="chat-image" {...rest} />
  ),
  table: (props: any) => (
    <TableContainer mt={4}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: TheadWrapper,
  tbody: TbodyWrapper,
  tr: TrWrapper,
  td: TdWrapper,
  th: ThWrapper,
};

export const Markdown = ({
  className,
  components,
  children,
  ...rest
}: MarkdownProps) => {
  // Combine with any custom components provided by the user
  // The user-provided ones will override our defaults if there's a conflict
  const allComponents = { ...baseMarkdownComponents, ...components };

  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        remarkFlexibleMarkers,
        remarkBreaks,
        remarkMath,
      ]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      className={[MarkdownStyles.markdownStyles, className].join(' ')}
      components={allComponents}
      {...rest}
    >
      {formatForMarkdown(children ?? '')}
    </ReactMarkdown>
  );
};
