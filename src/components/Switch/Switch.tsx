import { SwitchBase } from './SwitchBase';
import { SwitchControl } from './SwitchControl';
import { SwitchLabel } from './SwitchLabel';

export const Switch = Object.assign(SwitchBase, {
  Control: SwitchControl,
  Label: SwitchLabel,
});
