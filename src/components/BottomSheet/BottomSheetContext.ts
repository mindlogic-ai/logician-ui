'use client';

import { Drawer, useDrawerContext } from '@ark-ui/react/drawer';
import {
  createSlotRecipeContext,
  type HTMLChakraProps,
} from '@chakra-ui/react';

import { bottomSheetSlotRecipe } from './BottomSheet.styles';
import type { BottomSheetContextValue } from './BottomSheet.types';

const { withRootProvider, withContext, useStyles } = createSlotRecipeContext({
  recipe: bottomSheetSlotRecipe,
});

/**
 * Chakra-styled Ark parts, one per recipe slot.
 *
 * Built the way Chakra builds its own Ark-backed components: `withRootProvider`
 * resolves the recipe once at the root and `withContext` hands each part its
 * slot's styles, so every part still takes style props, `css` and `asChild`.
 */
export const StyledRoot = withRootProvider<Drawer.RootProps>(Drawer.Root, {
  // Nothing is in the DOM until the first open, and the content leaves it again
  // once its exit animation has finished — a closed sheet holding a long list
  // would otherwise keep every row mounted.
  defaultProps: { lazyMount: true, unmountOnExit: true },
});

export const StyledBackdrop = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div', Drawer.BackdropBaseProps>
>(Drawer.Backdrop, 'backdrop', { forwardAsChild: true });
export const StyledPositioner = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div', Drawer.PositionerBaseProps>
>(Drawer.Positioner, 'positioner', { forwardAsChild: true });
export const StyledContent = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div', Drawer.ContentBaseProps>
>(Drawer.Content, 'content', { forwardAsChild: true });
export const StyledGrabber = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div', Drawer.GrabberBaseProps>
>(Drawer.Grabber, 'grabber', { forwardAsChild: true });
export const StyledGrabberIndicator = withContext<
  HTMLDivElement,
  HTMLChakraProps<'div', Drawer.GrabberIndicatorBaseProps>
>(Drawer.GrabberIndicator, 'grabberIndicator', { forwardAsChild: true });
export const StyledTitle = withContext<
  HTMLHeadingElement,
  HTMLChakraProps<'h2', Drawer.TitleBaseProps>
>(Drawer.Title, 'title', { forwardAsChild: true });
export const StyledCloseTrigger = withContext<
  HTMLButtonElement,
  HTMLChakraProps<'button', Drawer.CloseTriggerBaseProps>
>(Drawer.CloseTrigger, 'closeTrigger', { forwardAsChild: true });
export const StyledHeader = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'header'
);
export const StyledBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'body'
);
export const StyledFooter = withContext<HTMLDivElement, HTMLChakraProps<'div'>>(
  'div',
  'footer'
);

export const useBottomSheetStyles = useStyles;

/**
 * The open sheet's Ark drawer API — `open`, `setOpen`, `snapPoint`,
 * `setSnapPoint`, `getContentSize`, … Call it from anything rendered inside
 * `<BottomSheet>`.
 */
export const useBottomSheetContext = (): BottomSheetContextValue =>
  useDrawerContext();
