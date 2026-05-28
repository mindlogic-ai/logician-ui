import { Portal, Toaster as ChakraToaster } from '@chakra-ui/react';

import { Toast } from './Toast';
import { toastStyles } from './Toast.styles';
import { toaster } from './toaster';

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
