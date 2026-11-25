import type { ComponentType, ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '../../theme';
import { InlineCode } from '../InlineCode/InlineCode';
import { MaxLengthIndicator } from '../MaxLengthIndicator/MaxLengthIndicator';
import {
  Caption,
  H1,
  H2,
  H3,
  H4,
  H5,
  Link,
  Overline,
  Subtext,
  Subtitle,
  Text,
} from '.';

/**
 * Each typography component sets defaults (`textStyle`, `color`, `as`…) and then
 * spreads the caller's props. A conditional prop such as
 * `textStyle={isIframe ? {…} : undefined}` used to put `textStyle: undefined`
 * into that spread and wipe the default, so the heading fell back to Chakra's
 * own `Heading` size (factchat-nextjs dashboard hero, R30 QA).
 *
 * Chakra turns the resolved style props into atomic class names, so two
 * elements with the same class list render with the same styles.
 */
type AnyTypography = ComponentType<Record<string, unknown>>;

// [name, component, rendered tag, the tier's own default textStyle]
const COMPONENTS: Array<[string, AnyTypography, string, string]> = [
  ['H1', H1 as AnyTypography, 'H1', 'h1'],
  ['H2', H2 as AnyTypography, 'H2', 'h2'],
  ['H3', H3 as AnyTypography, 'H3', 'h3'],
  ['H4', H4 as AnyTypography, 'H4', 'h4'],
  ['H5', H5 as AnyTypography, 'H5', 'h5'],
  ['Text', Text as AnyTypography, 'P', 'p'],
  ['Subtitle', Subtitle as AnyTypography, 'P', 'subtitle'],
  ['Subtext', Subtext as AnyTypography, 'P', 'subtext'],
  ['Caption', Caption as AnyTypography, 'P', 'caption'],
  ['Overline', Overline as AnyTypography, 'P', 'overline'],
];

const renderEl = (ui: ReactNode) => {
  const { container, unmount } = render(
    <ChakraProvider value={system}>{ui}</ChakraProvider>
  );
  const el = container.firstElementChild as HTMLElement;
  const result = { tag: el.tagName, className: el.className };
  unmount();
  return result;
};

describe.each(COMPONENTS)(
  '%s with explicitly undefined props',
  (_name, C, tag, ownStyle) => {
    const base = renderEl(<C>label</C>);

    it('textStyle={undefined} keeps the default text style', () => {
      expect(renderEl(<C textStyle={undefined}>label</C>)).toEqual(base);
    });

    it('color, fontWeight and as set to undefined keep their defaults', () => {
      expect(
        renderEl(
          <C color={undefined} fontWeight={undefined} as={undefined}>
            label
          </C>
        )
      ).toEqual(base);
      expect(base.tag).toBe(tag);
    });

    it('an explicit textStyle still wins', () => {
      // Any text style that is not this component's own default.
      const other = _name === 'Caption' ? 'overline' : 'caption';
      const overridden = renderEl(<C textStyle={other}>label</C>);
      expect(overridden.className).not.toBe(base.className);
      expect(overridden.tag).toBe(tag);
    });

    it('fontSize still disables the default text style', () => {
      const sized = renderEl(<C fontSize="40px">label</C>);
      // The same size with the tier's own style put back explicitly. If
      // `fontSize` stopped dropping the default, these would be equal.
      const sizedWithOwnStyle = renderEl(
        <C fontSize="40px" textStyle={ownStyle}>
          label
        </C>
      );
      expect(sized.className).not.toBe(sizedWithOwnStyle.className);
      expect(
        renderEl(
          <C fontSize="40px" textStyle={undefined}>
            label
          </C>
        )
      ).toEqual(sized);
    });
  }
);

describe('Link with explicitly undefined props', () => {
  const base = renderEl(<Link href="#a">label</Link>);

  it('fontWeight and color set to undefined keep the link defaults', () => {
    expect(
      renderEl(
        <Link href="#a" fontWeight={undefined} color={undefined}>
          label
        </Link>
      )
    ).toEqual(base);
  });

  it('an explicit fontWeight still wins', () => {
    expect(
      renderEl(
        <Link href="#a" fontWeight={700}>
          label
        </Link>
      ).className
    ).not.toBe(base.className);
  });
});

describe('InlineCode with explicitly undefined props', () => {
  it('textStyle and color set to undefined keep the defaults', () => {
    expect(
      renderEl(
        <InlineCode textStyle={undefined} color={undefined}>
          x
        </InlineCode>
      )
    ).toEqual(renderEl(<InlineCode>x</InlineCode>));
  });
});

describe('MaxLengthIndicator with explicitly undefined props', () => {
  it("textStyle={undefined} keeps its own subtext default, not Subtitle's", () => {
    expect(
      renderEl(
        <MaxLengthIndicator value={1} maxLength={10} textStyle={undefined} />
      )
    ).toEqual(renderEl(<MaxLengthIndicator value={1} maxLength={10} />));
  });
});
