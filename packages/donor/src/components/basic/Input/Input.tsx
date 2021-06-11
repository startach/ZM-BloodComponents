import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import styles from "./Input.module.scss";
import classNames from "classnames";

export enum InputVariant {
  standard = "standard",
  filled = "filled",
  outlined = "outlined",
}

export type InputProps = {
  id?: string;
  label?: string;
  onChangeText: (newValue: string) => void;
  value?: any;
  type?: string;
  className?: string;
  errorMessage?: string;
  /** Standard - MUI design, Filled - With Background, or Outlined - With borders */
  variant?: InputVariant;
  onSubmit?: () => void;
};

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChangeText,
  className,
  errorMessage,
  variant = InputVariant.standard,
  onSubmit,
}: InputProps) {
  return (
    <div className={styles.component}>
      <TextField
        id={id}
        value={value}
        type={type}
        onChange={(e) => onChangeText(e.currentTarget.value)}
        label={label}
        className={classNames(styles.input, className)}
        error={Boolean(errorMessage)}
        dir="rtl"
        variant={variant}
        helperText={errorMessage}
        onKeyPress={(event) => {
          if (onSubmit && event.key === "Enter") {
            onSubmit();
          }
        }}
      />
    </div>
  );
}
