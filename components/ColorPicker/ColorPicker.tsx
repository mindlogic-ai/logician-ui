import { memo } from 'react';
import { HexColorPicker } from 'react-colorful';

import { ColorPickerProps } from './ColorPicker.types';

export const ColorPicker = memo((props: ColorPickerProps) => (
  <HexColorPicker {...props} />
));

ColorPicker.displayName = 'ColorPicker';
