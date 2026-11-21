/**
 * Raw Chakra UI pass-throughs.
 *
 * Every name in this file is re-exported from `@chakra-ui/react` UNCHANGED,
 * because logician-ui has no design-system version of it yet (layout
 * primitives, utilities, hooks and their types). It exists so consumers can
 * import *everything* from `@mindlogic-ai/logician-ui` and never from
 * `@chakra-ui/react` directly — which is what lets the
 * `logician/no-chakra-import` ESLint rule flag every place an app picks a raw
 * Chakra component where logician-ui has its own.
 *
 * Adding a name here is a deliberate decision, not a convenience:
 *  - Explicit named re-exports only. NEVER `export * from '@chakra-ui/react'`.
 *  - Never add a name logician-ui already exports itself (Text, Button, Input,
 *    Popover, Tabs, Select, …) — TypeScript will refuse the duplicate export
 *    from src/index.ts anyway, and the logician component must win.
 *  - Never add a name that has a DS equivalent: Dialog (→ Modal),
 *    Field (→ FieldRow / FormControl), NativeSelect (→ Select).
 *  - Theme / provider bits (ChakraProvider, createSystem, defaultConfig,
 *    defineConfig, mergeConfigs, defaultSystem) are NOT re-exported; consumers'
 *    theme/provider/test-support folders are exempted from the lint rule via
 *    its `allow` option instead.
 *  - When logician-ui ships its own version of a name, delete it from here in
 *    the same PR.
 *
 * After editing, run `yarn check-exports` (or
 * `node scripts/eslint/generate-exports.cjs`) to regenerate
 * eslint/logician-exports.json, which the lint rule reads.
 */

// Layout primitives
export type {
  AbsoluteCenterProps,
  AspectRatioProps,
  BoxProps,
  CenterProps,
  CircleProps,
  FlexProps,
  FloatProps,
  GridItemProps,
  GridProps,
  SimpleGridProps,
  SpacerProps,
  SpanProps,
  StackProps,
  StackSeparatorProps,
  WrapItemProps,
  WrapProps,
} from '@chakra-ui/react';
export {
  AbsoluteCenter,
  AspectRatio,
  Box,
  Center,
  Circle,
  Flex,
  Float,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Spacer,
  Span,
  Stack,
  StackSeparator,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

// Display / utility components with no DS version yet
export type {
  ButtonGroupProps,
  CloseButtonProps,
  ColorSwatchProps,
  DrawerRootProps,
  EditableRootProps,
  HighlightProps,
  HoverCardRootProps,
  ImageProps,
  KbdProps,
  LinkBoxProps,
  LinkOverlayProps,
  ListRootProps,
  PortalProps,
  ProgressCircleRootProps,
  SeparatorProps,
  SkeletonCircleProps,
  SkeletonProps,
  SkeletonTextProps,
  StepsRootProps,
} from '@chakra-ui/react';
export {
  ButtonGroup,
  CloseButton,
  ColorSwatch,
  Drawer,
  Editable,
  Highlight,
  HoverCard,
  Image,
  Kbd,
  LinkBox,
  LinkOverlay,
  List,
  Portal,
  ProgressCircle,
  Separator,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Steps,
  VisuallyHidden,
} from '@chakra-ui/react';

// Style factory, hooks and utilities
export type {
  HTMLChakraProps,
  SystemStyleObject,
  UseDisclosureProps,
  UseDisclosureReturn,
} from '@chakra-ui/react';
export {
  chakra,
  mergeRefs,
  useBreakpointValue,
  useCallbackRef,
  useDisclosure,
  useMediaQuery,
  useSlotRecipe,
  useToken,
} from '@chakra-ui/react';
