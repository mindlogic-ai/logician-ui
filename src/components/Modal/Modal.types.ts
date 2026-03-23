import { Dialog } from '@chakra-ui/react';

export type PortalProps = {
  containerRef?: React.RefObject<HTMLElement | null>;
};

export type ModalProps = Dialog.RootProps & {
  // Allows passing props to the Portal component for more control over where the modal is rendered
  // Added for backwards compatibility.
  portalProps?: PortalProps;
};
