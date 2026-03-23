import { Dialog, PortalProps } from '@chakra-ui/react';

export type ModalProps = Dialog.RootProps & {
  // Allows passing props to the Portal component for more control over where the modal is rendered
  // Added for backwards compatibility.
  portalProps?: PortalProps;
};
