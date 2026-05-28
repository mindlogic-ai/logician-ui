import { createToaster, CreateToasterReturn } from '@chakra-ui/react';

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
