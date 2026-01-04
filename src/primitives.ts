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
  // Form Controls
  Checkbox as V3Checkbox,
  RadioGroup as V3RadioGroup,
  Switch as V3Switch,
  Slider as V3Slider,
  Field as V3Field,
  PinInput as V3PinInput,
  NumberInput as V3NumberInput,

  // Overlay & Dialogs
  Dialog as V3Dialog,
  Menu as V3Menu,
  Popover as V3Popover,
  Tooltip as V3Tooltip,

  // Disclosure
  Accordion as V3Accordion,
  Collapsible as V3Collapsible,
  Tabs as V3Tabs,

  // Data Display
  Avatar as V3Avatar,
  Badge as V3Badge,
  Card as V3Card,
  Table as V3Table,
  Tag as V3Tag,
  Progress as V3Progress,

  // Navigation
  Breadcrumb as V3Breadcrumb,

  // Layout
  List as V3List,
} from '@chakra-ui/react';
