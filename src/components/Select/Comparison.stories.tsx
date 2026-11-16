import type { ReactNode } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { Meta } from '@storybook/react';

import { FieldTrigger } from '../FieldTrigger';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { SelectField } from './SelectField';

/**
 * Temporary visual comparison between Input, Select, FieldTrigger and
 * Textarea. Verifies the controls share the same default look (border, hover,
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
    <Text fontWeight="semibold" fontSize="sm" color="fg.default">
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
      <FieldTrigger placeholder="FieldTrigger" />
      <Textarea placeholder="Textarea" />
    </Row>
    <Row label="Filled">
      <Input defaultValue="Input value" />
      <SelectField options={categoryOptions} defaultValue="business" />
      <FieldTrigger>FieldTrigger value</FieldTrigger>
      <Textarea defaultValue="Textarea value" />
    </Row>
    <Row label="Invalid">
      <Input placeholder="Input" invalid />
      <SelectField options={categoryOptions} placeholder="Select" invalid />
      <FieldTrigger placeholder="FieldTrigger" invalid />
      <Textarea placeholder="Textarea" invalid />
    </Row>
    <Row label='Select variant="ghost" — default / invalid / disabled'>
      <SelectField
        variant="ghost"
        options={categoryOptions}
        placeholder="Select"
      />
      <SelectField
        variant="ghost"
        options={categoryOptions}
        placeholder="Select"
        invalid
      />
      <SelectField
        variant="ghost"
        options={categoryOptions}
        placeholder="Select"
        disabled
      />
    </Row>
    <Row label="Disabled">
      <Input placeholder="Input" disabled />
      <SelectField options={categoryOptions} placeholder="Select" disabled />
      <FieldTrigger placeholder="FieldTrigger" disabled />
      <Textarea placeholder="Textarea" disabled />
    </Row>
  </Stack>
);

/**
 * The four form-control sizes, Input / Select / Textarea per row.
 */
export const SizeProgression = () => (
  <Stack gap={8} maxW="360px">
    {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
      <Row key={size} label={`size="${size}"`}>
        <Input size={size} placeholder={`Input ${size}`} />
        <SelectField
          size={size}
          options={categoryOptions}
          placeholder={`Select ${size}`}
        />
        <FieldTrigger size={size} placeholder={`FieldTrigger ${size}`} />
        <Textarea size={size} placeholder={`Textarea ${size}`} />
      </Row>
    ))}
  </Stack>
);
