import type { ControlSize } from '@/theme/controlSizes';

import type { FieldTriggerSize } from '../FieldTrigger';
import { MdOutlineCalendarToday } from '../Icon';

/**
 * `FieldTrigger` has `Select`'s four sizes; the pickers take the whole control
 * scale. The two ends map to the nearest field size.
 */
const FIELD_SIZE: Record<ControlSize, FieldTriggerSize> = {
  '2xs': 'xs',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'lg',
};

export const toFieldTriggerSize = (
  size: ControlSize | undefined
): FieldTriggerSize => FIELD_SIZE[size ?? 'md'] ?? 'md';

/**
 * The cue in the trigger's indicator slot, where a `Select` has its chevron:
 * `FieldTrigger` sizes and colours it like the chevron of the same size.
 */
export const calendarIndicator = <MdOutlineCalendarToday />;
