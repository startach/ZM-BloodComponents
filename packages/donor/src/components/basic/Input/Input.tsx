import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import styles from "./Input.module.scss";
import classNames from "classnames";

export enum InputVariant {
  standard = "standard",
  filled = "filled",
  outlined = "outlined",
}

type InputProps = {
  id?: string;
  label?: string;
  onChangeText: (newValue: string) => void;
  value?: any;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  mainIcon?: any;
  errorMessage?: string;
  actionIcon?: any;
  /** Standard - MUI design, Filled - With Background, or Outlined - With borders */
  variant?: InputVariant;
  isFullWidth?: boolean;
  onKeyPress?: (ev: any) => void;
};

export default function Input({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChangeText,
  className,
  mainIcon,
  actionIcon,
  isDisabled,
  errorMessage,
  variant = InputVariant.standard,
  isFullWidth = false,
  onKeyPress = (ev) => undefined,
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
    <div className={styles.component}>
      <TextField
        id={id}
        value={value}
        type={type}
        onChange={(e) => onChangeText(e.currentTarget.value)}
        placeholder={placeholder}
        label={label}
        className={classNames(styles.input, className)}
        disabled={isDisabled}
        inputProps={adornments}
        error={Boolean(errorMessage)}
        dir="rtl"
        variant={variant}
        fullWidth={isFullWidth}
        helperText={errorMessage}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}
