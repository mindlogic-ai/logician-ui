import React from 'react';
import { TextProps } from '@chakra-ui/react';
import { Meta, StoryFn } from '@storybook/react';

import { H1, H2, H3, H4, H5, Subtitle, Subtext, Text, Link } from '.';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography',
  component: Text,
};

export default meta;
type Story = StoryFn<typeof Text>;

export const AllTextStyles: Story = (props: TextProps) => {
  return (
    <>
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
    </>
  );
};
