import { RadioGroup } from '@chakra-ui/react';

export interface RadioProps extends RadioGroup.ItemProps {
  rootRef?: React.RefObject<HTMLDivElement | null>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
