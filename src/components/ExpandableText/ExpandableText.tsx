import React, { useEffect, useRef, useState } from 'react';
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

type CharLimitProps = {
  /**
   * Truncation strategy.
   * - `'charLimit'` (default): truncates by character count. Works regardless of
   *   font size or container width; safe for SSR.
   * - `'lineClamp'`: truncates by visible line count using CSS `-webkit-line-clamp`
   *   and a `ResizeObserver`. Responds correctly to font-size and container-width
   *   changes. Use when the text renders at a known line density.
   */
  mode?: 'charLimit';
  /** Maximum characters before truncation. Only used when `mode="charLimit"`. */
  charLimit?: number;
  lineClamp?: never;
};

type LineClampProps = {
  mode: 'lineClamp';
  /** Number of visible lines before truncation. Only used when `mode="lineClamp"`. */
  lineClamp?: number;
  charLimit?: never;
};

export type ExpandableTextProps = (CharLimitProps | LineClampProps) & {
  component?: TextComponentType;
} & TypographyProps;

export const ExpandableText = ({
  mode = 'charLimit',
  charLimit = 100,
  lineClamp = 3,
  component = 'Text',
  children,
  ...rest
}: ExpandableTextProps) => {
  if (mode === 'lineClamp') {
    return (
      <ExpandableTextLineClamp
        lineClamp={lineClamp}
        component={component}
        {...rest}
      >
        {children}
      </ExpandableTextLineClamp>
    );
  }

  return (
    <ExpandableTextCharLimit
      charLimit={charLimit}
      component={component}
      {...rest}
    >
      {children}
    </ExpandableTextCharLimit>
  );
};

// ── char-limit variant (original behaviour) ───────────────────────────────────

type CharLimitInternalProps = {
  charLimit: number;
  component: TextComponentType;
} & TypographyProps;

const ExpandableTextCharLimit = ({
  charLimit,
  component,
  children,
  ...rest
}: CharLimitInternalProps) => {
  const translate = useTranslate();
  const { displayText, isLong, isExpanded, handleToggle } = useExpandableText(
    children,
    charLimit
  );

  const Component = TEXT_COMPONENTS[component];

  return (
    <Component {...rest}>
      {displayText}
      {isLong && (
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

// ── line-clamp variant ────────────────────────────────────────────────────────

type LineClampInternalProps = {
  lineClamp: number;
  component: TextComponentType;
} & TypographyProps;

const ExpandableTextLineClamp = ({
  lineClamp,
  component,
  children,
  ...rest
}: LineClampInternalProps) => {
  const translate = useTranslate();
  const ref = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      if (!el.isConnected || el.clientHeight === 0) return;
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isExpanded, children]);

  const Component = TEXT_COMPONENTS[component];
  const showToggle = isOverflowing || isExpanded;

  return (
    <Box>
      <Component
        ref={ref}
        {...rest}
        {...(!isExpanded && {
          overflow: 'hidden',
          display: '-webkit-box',
          css: {
            WebkitLineClamp: lineClamp,
            WebkitBoxOrient: 'vertical',
          },
        })}
      >
        {children}
      </Component>
      {showToggle && (
        <Component mt={1}>
          <Link
            as="button"
            textDecor="none"
            fontWeight={600}
            _hover={{ color: 'primary.dark' }}
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              event.stopPropagation();
              setIsExpanded((prev) => !prev);
            }}
            aria-expanded={isExpanded}
          >
            {isExpanded ? translate('see_less') : translate('see_more')}
          </Link>
        </Component>
      )}
    </Box>
  );
};
