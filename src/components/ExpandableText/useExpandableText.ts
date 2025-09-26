import { isValidElement, useCallback, useMemo, useState } from 'react';

// Utility function to extract text content from ReactNode
const getTextContent = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  if (isValidElement(node)) {
    return getTextContent(node.props.children);
  }

  return '';
};

// Utility function to truncate ReactNode content while preserving structure
const truncateReactNode = (
  node: React.ReactNode,
  charLimit: number,
  currentLength = 0
): { truncated: React.ReactNode; length: number } => {
  if (currentLength >= charLimit) {
    return { truncated: null, length: currentLength };
  }

  if (typeof node === 'string' || typeof node === 'number') {
    const text = String(node);
    const remainingChars = charLimit - currentLength;

    if (text.length <= remainingChars) {
      return { truncated: node, length: currentLength + text.length };
    }

    return {
      truncated: text.slice(0, remainingChars) + '…',
      length: charLimit,
    };
  }

  if (Array.isArray(node)) {
    const truncatedChildren: React.ReactNode[] = [];
    let totalLength = currentLength;

    for (const child of node) {
      if (totalLength >= charLimit) break;

      const { truncated, length } = truncateReactNode(
        child,
        charLimit,
        totalLength
      );
      if (truncated !== null) {
        truncatedChildren.push(truncated);
      }
      totalLength = length;
    }

    return { truncated: truncatedChildren, length: totalLength };
  }

  if (isValidElement(node)) {
    const { truncated: truncatedChildren, length } = truncateReactNode(
      node.props.children,
      charLimit,
      currentLength
    );

    if (truncatedChildren === null) {
      return { truncated: null, length };
    }

    return {
      truncated: {
        ...node,
        props: {
          ...node.props,
          children: truncatedChildren,
        },
      },
      length,
    };
  }

  return { truncated: node, length: currentLength };
};

export const useExpandableText = (
  children: React.ReactNode,
  charLimit = 100
) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const textContent = useMemo(() => getTextContent(children), [children]);
  const isLong = textContent.length > charLimit;

  const displayText = useMemo(() => {
    if (isExpanded || !isLong) return children;

    const { truncated } = truncateReactNode(children, charLimit);
    return truncated;
  }, [isExpanded, isLong, children, charLimit]);

  const handleToggle = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  }, []);

  return { isExpanded, isLong, displayText, handleToggle };
};
