import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import Styles from "./_Input.module.scss";
import Text from "../Text";

type InputVariant = "standard" | "filled" | "outlined";

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
  variant?: InputVariant;
  isFullWidth?: boolean;
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
  variant = "standard",
  isFullWidth = false,
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
    <div className={Styles["input-container"]}>
      <TextField
        id={id}
        value={value}
        type={type}
        onChange={(e) => onChangeText(e.currentTarget.value)}
        placeholder={placeholder}
        label={label}
        className={className}
        disabled={isDisabled}
        inputProps={adornments}
        error={Boolean(errorMessage)}
        dir="rtl"
        variant={variant}
        fullWidth={isFullWidth}
      />
      <Text className={Styles["error-message"]}>{errorMessage}</Text>
    </div>
  );
}
