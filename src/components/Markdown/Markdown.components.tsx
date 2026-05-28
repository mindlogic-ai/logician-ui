import { Box } from '@chakra-ui/react';

import { Code } from '../Code';
import { InlineCode } from '../InlineCode';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '../Table';
import { H1, H2, H3, H4, H5, Link, Subtitle, Text } from '../Typography';

// Prepare base components.
// Wrappers are defined inline so this file has no local component exports,
// satisfying `react-doctor/only-export-components` (Fast Refresh).
export const baseMarkdownComponents = {
  h1: (props: any) => <H1 {...props} />,
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  h5: (props: any) => <H5 {...props} />,
  h6: (props: any) => <Subtitle {...props} />,
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
            .catch((err) => {
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
  a: (props: any) => (
    //  `children` should be inside ...rest
    <Link target="_blank" {...props} />
  ),
  ol: ({ style, ...rest }: any) => (
    <ol
      style={{
        paddingInlineStart: '22px',
        color: 'inherit',
        fontSize: '0.875rem',
        ...style,
      }}
      {...rest}
    />
  ),
  ul: ({ style, ...rest }: any) => (
    <ul
      style={{
        paddingInlineStart: '22px',
        color: 'inherit',
        fontSize: '0.875rem',
        ...style,
      }}
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
  thead: (props: any) => <Thead {...props} />,
  tbody: (props: any) => <Tbody {...props} />,
  tr: (props: any) => <Tr {...props} />,
  td: (props: any) => <Td {...props} />,
  th: (props: any) => <Th {...props} />,
};
