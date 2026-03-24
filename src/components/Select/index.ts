// Composition sub-components with design system defaults
export type { SelectContentProps } from './SelectContent';
export { SelectContent } from './SelectContent';
export type { SelectItemProps } from './SelectItem';
export { SelectItem } from './SelectItem';
export type { SelectTriggerProps } from './SelectTrigger';
export { SelectTrigger } from './SelectTrigger';

// Re-export Chakra v3 Select parts for full composition access
export {
  createListCollection,
  Select,
  useListCollection,
} from '@chakra-ui/react';

// Re-export filter utility for SearchSelect (Combobox) use cases
export { useFilter } from '@chakra-ui/react';

// Re-export Combobox for searchable select composition
export { Combobox } from '@chakra-ui/react';
