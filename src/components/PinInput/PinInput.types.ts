export interface PinInputProps {
  length: number;
  value?: string;
  onChange?: (value: string, index: number) => void;
  onComplete?: (value: string) => void;
  type?: 'numeric' | 'alphanumeric' | 'alphabetic';
  autoFocus?: boolean;
  otp?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
}
