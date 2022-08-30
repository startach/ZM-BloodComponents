import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import styles from "./Input.module.scss";
import classNames from "classnames";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import IconButton from "../IconButton";
import { reportInput } from "../../../Analytics";
import { InputType } from "@zm-blood-components/common";

export enum InputVariant {
  standard = "standard",
  filled = "filled",
  outlined = "outlined",
}

export type InputProps = {
  /** For logging and Analytics */
  name: string;
  id?: string;
  label?: string;
  onChangeText: (newValue: string) => void;
  value?: any;
  type?: InputType;
  className?: string;
  errorMessage?: string;
  /** Standard - MUI design, Filled - With Background, or Outlined - With borders */
  variant?: InputVariant;
  onSubmit?: () => void;
};

export default function Input({
  name,
  id,
  label,
  type = InputType.Text,
  value,
  onChangeText,
  className,
  errorMessage,
  variant = InputVariant.standard,
  onSubmit,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  let inputProps;
  const textFiledType = showPassword ? InputType.Text : type;
  if (type === InputType.Password) {
    inputProps = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            analytics={{ analyticsName: "show_password" }}
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
            size="large"
          >
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

  const handleChange = (newValue: string) => {
    onChangeText(newValue);

    reportInput(type, name, newValue);
  };

  return (
    <div className={styles.component}>
      <TextField
        id={id}
        value={value}
        type={textFiledType}
        onChange={(e) => handleChange(e.currentTarget.value)}
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
    </div>
  );
}
