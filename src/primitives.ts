/**
 * Chakra UI v3 Primitive Components
 *
 * These are the original Chakra UI v3 components with composition pattern support.
 * Use these when you need more control over the component structure than
 * the logician-ui wrapped components provide.
 *
 * @example
 * ```tsx
 * import { V3Checkbox } from '@mindlogic-ai/logician-ui';
 *
 * <V3Checkbox.Root>
 *   <V3Checkbox.HiddenInput />
 *   <V3Checkbox.Control>
 *     <V3Checkbox.Indicator />
 *   </V3Checkbox.Control>
 *   <V3Checkbox.Label>Label</V3Checkbox.Label>
 * </V3Checkbox.Root>
 * ```
 */

export {
  // Disclosure
  Accordion as V3Accordion,
  // Data Display
  Avatar as V3Avatar,
  Badge as V3Badge,
  // Navigation
  Breadcrumb as V3Breadcrumb,
  Card as V3Card,
  // Form Controls
  Checkbox as V3Checkbox,
  Collapsible as V3Collapsible,
  // Overlay & Dialogs
  Dialog as V3Dialog,
  Field as V3Field,
  // Layout
  List as V3List,
  Menu as V3Menu,
  NumberInput as V3NumberInput,
  PinInput as V3PinInput,
  Popover as V3Popover,
  Progress as V3Progress,
  RadioGroup as V3RadioGroup,
  Slider as V3Slider,
  Switch as V3Switch,
  Table as V3Table,
  Tabs as V3Tabs,
  Tag as V3Tag,
  Tooltip as V3Tooltip,
} from '@chakra-ui/react';
