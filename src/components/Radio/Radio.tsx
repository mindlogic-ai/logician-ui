import { RadioBase } from './RadioBase';
import { RadioControl } from './RadioControl';
import { RadioText } from './RadioText';

export const Radio = Object.assign(RadioBase, {
  Control: RadioControl,
  Text: RadioText,
});
