import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import styles from "./Input.module.scss";
import classNames from "classnames";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";

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
  const [showPassword, setShowPassword] = useState(false);

  let inputProps;
  let textFiledType = showPassword ? "text" : type;
  if (type === "password") {
    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </IconButton>
        </InputAdornment>
      ),
    };
  }

  return (
    <TextField
      id={id}
      value={value}
      type={textFiledType}
      onChange={(e) => onChangeText(e.currentTarget.value)}
      label={label}
      className={classNames(styles.input, className)}
      InputProps={inputProps}
      error={Boolean(errorMessage)}
      variant={variant}
      helperText={errorMessage}
      fullWidth
      onKeyPress={(event) => {
        if (onSubmit && event.key === "Enter") {
          onSubmit();
        }
      }}
    />
  );
}
