import {
  createToaster,
  CreateToasterReturn,
  Portal,
  Toaster as ChakraToaster,
} from '@chakra-ui/react';

import { Toast } from './Toast';
import { toastStyles } from './Toast.styles';

/**
 * Global toaster instance for managing toast notifications
 *
 * NOTE: In Chakra UI v3, placement must be set here in createToaster(), not per toast.
 * This is the official design - see https://github.com/chakra-ui/chakra-ui/issues/8924
 *
 * To change placement, modify the 'placement' value below.
 * To support multiple placements, create separate toaster instances for each placement.
 *
 * Configuration:
 * - placement: 'top' (can be changed to 'bottom', 'top-start', etc.)
 * - pauseOnPageIdle: Pause toast timer when page is idle
 */
export const toaster: CreateToasterReturn = createToaster({
  placement: 'top',
  pauseOnPageIdle: true,
});

/**
 * Toaster component to render toast notifications
 *
 * Must be placed at the root of your application (typically in App.tsx or _app.tsx)
 * to enable toast notifications throughout the app.
 *
 * Uses Chakra v3 composition pattern with custom styling and icons.
 *
 * @example
 * ```tsx
 * // In App.tsx
 * import { Toaster } from '@mindlogic-ai/logician-ui';
 *
 * function App() {
 *   return (
 *     <>
 *       <Toaster />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 */
export const Toaster = () => (
  <Portal>
    <ChakraToaster
      toaster={toaster}
      insetInline={{ mdDown: '4' }}
      pointerEvents="none"
      gap={3}
    >
      {(toast) => {
        // Extract custom data from meta
        const customStyles = toast.meta?.styles || {};
        const onClose = toast.meta?.onClose;

        return (
          <Toast
            title={toast.title}
            description={toast.description}
            status={toast.type}
            onClose={onClose}
            {...toastStyles[toast.type as keyof typeof toastStyles]}
            {...customStyles}
          />
        );
      }}
    </ChakraToaster>
  </Portal>
);
