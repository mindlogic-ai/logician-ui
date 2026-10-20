import { Dialog, PortalProps } from '@chakra-ui/react';

/**
 * `'brand'` paints the header a neutral `layer.3` band with a
 * `secondary.border` bottom rule (the subtitle stays `fg.muted`) for a modal that
 * wants brand presence up top — an onboarding step, a celebratory confirm.
 * `'default'` (the default) leaves the header unstyled, matching the body.
 */
export type ModalHeaderTone = 'default' | 'brand';

export type ModalProps = Dialog.RootProps & {
  // Allows passing props to the Portal component for more control over where the modal is rendered
  // Added for backwards compatibility.
  portalProps?: PortalProps;
  /**
   * Styles `ModalHeader` as a brand band instead of the plain default.
   * @default 'default'
   */
  headerTone?: ModalHeaderTone;
  /**
   * When true, the modal becomes fullscreen on mobile viewports
   * (100vw x 100dvh, no border-radius). When false it keeps the dialog
   * shape and applies a horizontal margin instead.
   *
   * Defaults to false: a full-screen takeover suits long or immersive
   * content (a file picker, a course switcher), not the confirm dialogs
   * and short forms that make up most modals. Opt in where the takeover
   * is the point.
   *
   * @default false
   */
  fullScreenOnMobile?: boolean;
};
