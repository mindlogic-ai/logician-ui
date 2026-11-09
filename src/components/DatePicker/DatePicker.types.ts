import type { ButtonProps } from '../Button';

export interface DatePickerSizeProps {
  /**
   * Size of the trigger, on the shared control scale (`controlSizes`): the
   * same height, type and icon size as a `Button` / `Input` of that size, so
   * a date filter lines up in a row of controls. A `size` in
   * `propsConfigs.triggerBtnProps` still wins.
   * @default 'md'
   */
  size?: ButtonProps['size'];
}
