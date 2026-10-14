// Component exports
export { Caption } from './Caption';
export { H1 } from './H1';
export { H2 } from './H2';
export { H3 } from './H3';
export { H4 } from './H4';
export { H5 } from './H5';
export { Link, LINK_RAMP } from './Link';
export { Overline } from './Overline';
export { Subtext } from './Subtext';
export { Subtitle } from './Subtitle';
export { Text } from './Text';

// Type exports
export type { LinkCustomProps as LinkProps } from './Link';
export type {
  TypographyProps as CaptionProps,
  TypographyProps as OverlineProps,
  TypographyProps as SubtextProps,
  TypographyProps as SubtitleProps,
  TypographyProps as TextProps,
  TypographyOwnProps,
  TypographyProps,
} from './Typography.types';
// The heading props now come from our own polymorphic type rather than
// Chakra's, so `as` carries the element's props with it.
export type {
  HeadingProps as H1Props,
  HeadingProps as H2Props,
  HeadingProps as H3Props,
  HeadingProps as H4Props,
  HeadingProps as H5Props,
  HeadingOwnProps,
  HeadingProps,
} from './Typography.types';
