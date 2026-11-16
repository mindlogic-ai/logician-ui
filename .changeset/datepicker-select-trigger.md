---
'@mindlogic-ai/logician-ui': patch
---

SingleDatePicker / RangeDatePicker: the trigger now looks exactly like a closed `Select` trigger instead of a secondary `Button` — `border.control` border, the field font weight, field padding, the field hover / focus ring / open / invalid / disabled states. The styles are read from the `select` slot recipe and `Select.styles.ts` at render time, so the date triggers follow Select from now on. It is still a real `<button>` Popover trigger with the calendar icon at the start, sized to its value; `propsConfigs.triggerBtnProps` is still spread last and wins. The picker's `disabled` prop now also disables the trigger.
