import TextField from "@material-ui/core/TextField";
import { IconButton, InputAdornment } from "@material-ui/core";
import styles from "./Input.module.scss";
import classNames from "classnames";
import { InputProps, InputVariant } from "./Input";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { useState } from "react";

export default function InputV2({
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
    <div className={styles.component}>
      <TextField
        id={id}
        value={value}
        type={textFiledType}
        onChange={(e) => onChangeText(e.currentTarget.value)}
        label={label}
        className={classNames(styles.input, className)}
        InputProps={inputProps}
        error={Boolean(errorMessage)}
        dir="rtl"
        variant={variant}
        helperText={errorMessage}
        fullWidth
        onKeyPress={(event) => {
          if (onSubmit && event.key === "Enter") {
            onSubmit();
          }
        }}
      />
    </div>
  );
}
