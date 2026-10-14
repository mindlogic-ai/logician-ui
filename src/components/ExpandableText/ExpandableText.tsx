import React from 'react';
import { Box } from '@chakra-ui/react';

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Link,
  Subtext,
  Subtitle,
  Text,
  TypographyProps,
} from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';

import { useExpandableText } from './useExpandableText';

// Define available text components
const TEXT_COMPONENTS = {
  Text,
  Subtitle,
  Subtext,
  H1,
  H2,
  H3,
  H4,
  H5,
} as const;

export type TextComponentType = keyof typeof TEXT_COMPONENTS;

export type ExpandableTextProps = {
  /**
   * How many lines to show while collapsed.
   * @default 3
   */
  lineClamp?: number;
  /**
   * @deprecated Truncation is by line, not by character — a character count
   * cannot be clipped by CSS, and clipping by CSS is what lets the expansion
   * animate. This prop is ignored; use {@link ExpandableTextProps.lineClamp}.
   */
  charLimit?: number;
  component?: TextComponentType;
} & TypographyProps;

/**
 * Text clipped to a few lines, with a link that opens it.
 *
 * Opening animates the height rather than swapping the text, so the content
 * below slides down instead of jumping — this is text someone is part-way
 * through reading, and a jump costs them their place.
 *
 * @example
 * ```tsx
 * <ExpandableText lineClamp={2}>{longDescription}</ExpandableText>
 * ```
 */
export const ExpandableText = ({
  lineClamp = 3,
  charLimit: _charLimit,
  component = 'Text',
  children,
  ...rest
}: ExpandableTextProps) => {
  const translate = useTranslate();
  const { contentRef, isExpanded, isOverflowing, maxHeight, handleToggle } =
    useExpandableText(lineClamp);

  const Component = TEXT_COMPONENTS[component];

  return (
    <Component {...rest}>
      <Box
        ref={contentRef}
        overflow="hidden"
        // `lh` is the line box, so the resting height is a whole number of lines
        // and the cut always lands between them. Where `lh` is unsupported the
        // declaration is dropped and the text simply shows in full — degraded,
        // not broken.
        maxHeight={maxHeight ?? `${lineClamp}lh`}
        animationStyle="travel"
        transitionProperty="max-height"
      >
        {children}
      </Box>
      {(isOverflowing || isExpanded) && (
        <Link
          as="button"
          textDecor="none"
          _hover={{ color: 'primary.dark' }}
          onClick={handleToggle}
          aria-expanded={isExpanded}
        >
          {isExpanded ? translate('see_less') : translate('see_more')}
        </Link>
      )}
    </Component>
  );
};
