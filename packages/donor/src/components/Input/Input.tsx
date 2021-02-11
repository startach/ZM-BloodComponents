import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";

type InputProps = {
  id?: string,
  label?: string;
  onChangeText: (newValue: string) => void;
  value?: any;
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  mainIcon?: any;
  isValid?: boolean;
  actionIcon?: any;
};

export default function ZMInput({
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
  isValid = true
}: InputProps) {

  let inputProps = {
    ...(mainIcon && {
      startAdornment: (
        <InputAdornment position="start">
          {mainIcon}
        </InputAdornment>
      )
    }),
    ...(actionIcon && {
      endAdornment: (
        <InputAdornment position="end">
          {actionIcon}
        </InputAdornment>
      )
    })
  }

  return (
      <TextField
        id={id}
        value={value}
        type={type}
        onChange={(e) => onChangeText(e.currentTarget.value)}
        placeholder={placeholder}
        label={label}
        className={className}
        disabled={isDisabled}
        inputProps={inputProps}
        error={!isValid}
        dir="rtl"
      />
  );
}
