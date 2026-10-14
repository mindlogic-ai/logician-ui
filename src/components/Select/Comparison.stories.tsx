import type { ReactNode } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { Meta } from '@storybook/react';

import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { SelectField } from './SelectField';

/**
 * Temporary visual comparison between Input, Select and Textarea.
 * Verifies the three controls share the same default look (border, hover,
 * focus, disabled / invalid states).
 *
 * Safe to delete once the unified style is no longer being iterated on.
 */
const meta = {
  title: 'Components/Select/Comparison',
} satisfies Meta;

export default meta;

const categoryOptions = [
  { label: '비즈니스', value: 'business' },
  { label: '교육', value: 'education' },
  { label: '엔터테인먼트', value: 'entertainment' },
];

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <Stack gap={2}>
    <Text fontWeight="semibold" fontSize="sm" color="gray.1000">
      {label}
    </Text>
    {children}
  </Stack>
);

/**
 * Every Input / Select / Textarea state, side by side.
 */
export const SideBySide = () => (
  <Stack gap={8} maxW="360px">
    <Row label="Default">
      <Input placeholder="Input" />
      <SelectField options={categoryOptions} placeholder="Select" />
      <Textarea placeholder="Textarea" />
    </Row>
    <Row label="Filled">
      <Input defaultValue="Input value" />
      <SelectField options={categoryOptions} defaultValue="business" />
      <Textarea defaultValue="Textarea value" />
    </Row>
    <Row label="Invalid">
      <Input placeholder="Input" invalid />
      <SelectField options={categoryOptions} placeholder="Select" invalid />
      <Textarea placeholder="Textarea" invalid />
    </Row>
    <Row label="Disabled">
      <Input placeholder="Input" disabled />
      <SelectField options={categoryOptions} placeholder="Select" disabled />
      <Textarea placeholder="Textarea" disabled />
    </Row>
  </Stack>
);
