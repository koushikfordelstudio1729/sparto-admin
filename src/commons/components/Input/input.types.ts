export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  visibleIcon?: React.ReactNode;
  hiddenIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  rightIconClassName?: string;
}
