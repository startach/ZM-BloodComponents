import { Button as MuiButton, PropTypes } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";
import { ButtonProps, ButtonVariant } from "./Button";
import styles from "./ButtonV2.module.scss";

export default function ButtonV2({
  onClick,
  title,
  color,
  variant = ButtonVariant.contained,
  className,
  isDisabled = false,
  isLoading = false,
}: ButtonProps) {
  // We want the button to be full width unless it is text button
  const fullWidth = variant !== "text";

  let selectedColor: PropTypes.Color;
  if (color) {
    selectedColor = color;
  } else if (variant === ButtonVariant.text) {
    selectedColor = "default";
  } else {
    selectedColor = "primary";
  }

  return (
    <MuiButton
      onClick={onClick}
      className={classnames(className, styles.button)}
      disabled={isDisabled || isLoading}
      variant={variant}
      fullWidth={fullWidth}
      color={selectedColor}
    >
      {isLoading ? <Spinner color={color} /> : title}
    </MuiButton>
  );
}
