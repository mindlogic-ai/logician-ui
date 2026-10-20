import React, { Fragment, isValidElement, ReactNode } from 'react';
import { Dialog } from '@chakra-ui/react';

import { Subtext } from '../Typography';
import { useModalContext } from './ModalContext';

export type ModalHeaderProps = Dialog.HeaderProps & {
  /**
   * Optional line under the title, in `fg.muted` (on the brand band too —
   * `secondary.fgStrong` on `layer.3` misses 7:1 in high-contrast dark). Rendered as the dialog's
   * description, so the dialog gets `aria-describedby` pointing at it.
   */
  subtitle?: ReactNode;
};

/**
 * The title takes the header's own type (`textStyle="h4"`) instead of the
 * recipe's `textStyle: lg` / `semibold`, so wrapping it changes nothing on
 * screen.
 */
const inheritType = {
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
} as const;

/**
 * The dialog header: the children are the dialog's title and `subtitle` sits
 * under it.
 *
 * Children become `Dialog.Title`, which gives the dialog its accessible name
 * (`aria-labelledby`). Text — a string, or text mixed with expressions — is
 * rendered as the title heading (`h2`). A single element is the caller's own
 * markup, possibly its own heading, so it is wrapped in a `div` carrying the
 * title id instead of being nested inside an `h2`.
 */
export const ModalHeader = ({
  subtitle,
  children,
  ...rest
}: ModalHeaderProps) => {
  const { headerTone } = useModalContext();
  const isBrand = headerTone === 'brand';
  const isOwnMarkup = isValidElement(children) && children.type !== Fragment;

  return (
    <Dialog.Header
      textStyle="h4"
      px={4}
      pt={4}
      pb={3}
      borderTopRadius="l3"
      // The recipe lays the header out as a row (`display: flex`, `gap: 2`),
      // which put the subtitle to the right of the title.
      flexDirection="column"
      alignItems="flex-start"
      gap={0}
      // Brand band: a neutral `layer.3` ground (≥ 1.13:1 off the panel in every
      // mode) with a `secondary.border` rule carrying the brand. Not the sand
      // `secondary.surface*` tint — that is accent-only, never a background.
      {...(isBrand && {
        bg: 'layer.3',
        borderBottomWidth: '1px',
        borderBottomColor: 'secondary.border',
      })}
      {...rest}
    >
      {isOwnMarkup ? (
        <Dialog.Title asChild {...inheritType}>
          <div>{children}</div>
        </Dialog.Title>
      ) : (
        <Dialog.Title {...inheritType}>{children}</Dialog.Title>
      )}
      {subtitle && (
        <Dialog.Description asChild>
          <Subtext mt={1} fontWeight="normal" color="fg.muted">
            {subtitle}
          </Subtext>
        </Dialog.Description>
      )}
    </Dialog.Header>
  );
};
