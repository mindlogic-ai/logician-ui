import React, {
  Children,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { Dialog } from '@chakra-ui/react';

import { isDev } from '@/utils/isDev';

import { Subtext } from '../Typography';
import { ModalCloseButton } from './ModalCloseButton';
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
 * Whether `children` is text only: strings and numbers, or arrays/fragments
 * made only of those (`null`, `undefined` and booleans render nothing and are
 * ignored). Any element makes it the caller's own markup.
 */
const isPlainText = (children: ReactNode): boolean =>
  Children.toArray(children).every((child) => {
    if (typeof child === 'string' || typeof child === 'number') return true;
    if (isValidElement(child) && child.type === Fragment) {
      return isPlainText(
        (child as ReactElement<{ children?: ReactNode }>).props.children
      );
    }
    return false;
  });

let warnedCloseButtonInHeader = false;

/**
 * Dev-only: a `ModalCloseButton` inside the header becomes part of the title
 * (and so of the dialog's accessible name). Warns once per page load.
 */
const warnOnCloseButtonChild = (children: ReactNode) => {
  if (!isDev() || warnedCloseButtonInHeader) return;
  const hasCloseButton = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === ModalCloseButton
  );
  if (hasCloseButton) {
    warnedCloseButtonInHeader = true;
    console.warn(
      '[logician-ui] ModalCloseButton was passed as a child of ModalHeader, ' +
        "so its label becomes part of the dialog's title. Place " +
        'ModalCloseButton as a sibling of ModalHeader inside ModalContent ' +
        'instead.'
    );
  }
};

/**
 * The dialog header: the children are the dialog's title and `subtitle` sits
 * under it.
 *
 * Children become `Dialog.Title`, which gives the dialog its accessible name
 * (`aria-labelledby`). Plain text — a string, or text mixed with expressions —
 * is rendered as the title heading (`h2`). As soon as any child is an element,
 * the children are the caller's own markup, possibly with its own heading, so
 * they are wrapped in a `div` carrying the title id instead of being nested
 * inside an `h2`.
 *
 * Put `ModalCloseButton` next to the header inside `ModalContent`, not inside
 * it — otherwise its label becomes part of the dialog's name.
 */
export const ModalHeader = ({
  subtitle,
  children,
  ...rest
}: ModalHeaderProps) => {
  const { headerTone } = useModalContext();
  const isBrand = headerTone === 'brand';
  const isOwnMarkup = !isPlainText(children);
  warnOnCloseButtonChild(children);

  return (
    <Dialog.Header
      textStyle="h4"
      px={4}
      pt={4}
      pb={3}
      borderTopRadius="l3"
      // The recipe lays the header out as a row (`display: flex`, `gap: 2`),
      // which put the subtitle to the right of the title. In a column,
      // `stretch` lets the title and the caller's own markup fill the header's
      // width; plain text still starts at the left edge.
      flexDirection="column"
      alignItems="stretch"
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
