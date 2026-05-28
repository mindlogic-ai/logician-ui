import { CheckboxBase } from './CheckboxBase';
import { CheckboxControl } from './CheckboxControl';
import { CheckboxLabel } from './CheckboxLabel';

export const Checkbox = Object.assign(CheckboxBase, {
  Control: CheckboxControl,
  Label: CheckboxLabel,
});
