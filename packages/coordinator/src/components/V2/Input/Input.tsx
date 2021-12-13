import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import styles from "./Input.module.scss";
import classNames from "classnames";
type InputVariant = "standard" | "filled" | "outlined";

type InputProps = {
  id?: string;
  label?: string;
  onChange: (newValue: string) => void;
  value?: any;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  mainIcon?: any;
  errorMessage?: string;
  actionIcon?: any;
  variant?: InputVariant;
  isFullWidth?: boolean;
  required?: boolean;
};

export default function Input({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  className,
  mainIcon,
  actionIcon,
  isDisabled,
  errorMessage,
  variant = "standard",
  isFullWidth = false,
  required = false,
}: InputProps) {
  let adornments = {
    ...(mainIcon && {
      startAdornment: (
        <InputAdornment position="start">{mainIcon}</InputAdornment>
      ),
    }),
    ...(actionIcon && {
      endAdornment: (
        <InputAdornment position="end">{actionIcon}</InputAdornment>
      ),
    }),
  };
  return (
    <div>
      <TextField
        id={id}
        value={value}
        type={type}
        onChange={(e) => onChange?.(e.currentTarget.value)}
        placeholder={placeholder}
        label={label}
        className={classNames(styles.component, className)}
        disabled={isDisabled}
        inputProps={adornments}
        error={Boolean(errorMessage)}
        dir="rtl"
        variant={variant}
        fullWidth={isFullWidth}
        helperText={errorMessage}
        required={required}
      />
    </div>
  );
}
