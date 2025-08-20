// TODO: This interface is copied from the react-pin-input package. Find a more scalable way to import this interface if it gets updated
interface ReactPinInputProps {
  length: number;
  initialValue?: number | string;
  type?: 'numeric' | 'custom';
  inputMode?: string;
  secret?: boolean;
  secretDelay?: number;
  disabled?: boolean;
  focus?: boolean;
  onChange?: (value: string, index: number) => void;
  onComplete?: (value: string, index: number) => void;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  inputFocusStyle?: React.CSSProperties;
  validate?: (value: string) => string;
  autoSelect?: boolean;
  regexCriteria?: any;
  ariaLabel?: string;
  placeholder?: string;
}

export type PinInputProps = ReactPinInputProps & {
  value?: string;
  autoFocus?: boolean;
  isNumberOnly?: boolean;
};
