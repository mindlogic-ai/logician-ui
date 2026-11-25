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
 * The calendar ahead of the date, as `FieldTrigger`'s `startElement`:
 * coloured and sized like a `Select` chevron of the same size. It is the
 * field's one cue, so the pickers pass `indicator={null}` and draw no chevron.
 */
export const calendarStartElement = <MdOutlineCalendarToday />;
