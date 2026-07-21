import { Meta, StoryObj } from '@storybook/react';

import { InlineCode } from '../InlineCode';

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

const meta = {
  title: 'Components/Typography',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const AllTextStyles: Story = {
  render: (props) => (
    <>
      <Overline {...props}>Overline - section eyebrow</Overline>
      <H1 {...props}>
        H1 - Lorem ipsum dolor sit amet,{' '}
        <Link variant="error" href="https://example.com">
          consectetur adipiscing elit
        </Link>
      </H1>
      <H2 {...props}>
        H2 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H2>
      <H3 {...props}>
        H3 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H3>
      <H4 {...props}>
        H4 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H4>
      <H5 {...props}>
        H5 - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </H5>
      <Text {...props}>
        Paragraph - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Text>
      <Subtitle {...props}>
        Subtitle - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Subtitle>
      <Subtext {...props}>
        Subtext - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Subtext>
      <Caption {...props}>
        Caption - Lorem ipsum dolor sit amet,{' '}
        <Link href="https://example.com">consectetur adipiscing elit</Link>
      </Caption>
    </>
  ),
};

// InlineCode nested in each type tier. InlineCode's size is em-relative
// (textStyle="subtext"), so it tracks whatever it sits in: a readable step below
// body in a paragraph, and proportionally smaller inside a heading. Use this to
// eyeball the step-down per context and to confirm a caller's `fontFamily="mono"`
// still wins (InlineCode has no mono default). Pair with `AllTextStyles` above.
export const InlineCodeInTextStyles: Story = {
  render: () => {
    const code = <InlineCode fontFamily="mono">inline_code()</InlineCode>;
    return (
      <>
        <H1>H1 heading with {code} inside</H1>
        <H2>H2 heading with {code} inside</H2>
        <H3>H3 heading with {code} inside</H3>
        <H4>H4 heading with {code} inside</H4>
        <H5>H5 heading with {code} inside</H5>
        <Text>Paragraph body text with {code} mid-sentence.</Text>
        <Subtitle>Subtitle with {code} inside</Subtitle>
        <Subtext>Subtext with {code} inside</Subtext>
        <Caption>Caption with {code} inside</Caption>
      </>
    );
  },
};
