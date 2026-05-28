import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkFlexibleMarkers from 'remark-flexible-markers';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css'; // Import KaTeX CSS

import { baseMarkdownComponents } from './Markdown.components';
import MarkdownStyles from './Markdown.module.css';
import { MarkdownProps } from './Markdown.types';

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
    <div className={[MarkdownStyles.markdownStyles, className].join(' ')}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkFlexibleMarkers,
          remarkBreaks,
          remarkMath,
        ]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={allComponents}
        {...rest}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
