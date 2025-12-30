import React from 'react';

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
  charLimit?: number;
  component?: TextComponentType;
} & TypographyProps;

export const ExpandableText = ({
  charLimit = 100,
  component = 'Text',
  children,
  ...rest
}: ExpandableTextProps) => {
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
        <>
          {' '}
          <Link as="button" onClick={handleToggle} aria-expanded={isExpanded}>
            {isExpanded ? translate('see_less') : translate('see_more')}
          </Link>
        </>
      )}
    </Component>
  );
};
