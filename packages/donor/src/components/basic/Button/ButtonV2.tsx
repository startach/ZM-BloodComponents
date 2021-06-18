import { Button as MuiButton } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";
import { ButtonProps, ButtonVariant } from "./Button";
import styles from "./ButtonV2.module.scss";

export default function ButtonV2({
  onClick,
  title,
  color = "primary",
  variant = ButtonVariant.contained,
  className,
  isDisabled = false,
  isLoading = false,
}: ButtonProps) {
  // We want the button to be full width unless it is text button
  const fullWidth = variant !== "text";

  return (
    <MuiButton
      onClick={onClick}
      className={classnames(className, styles.button)}
      disabled={isDisabled || isLoading}
      variant={variant}
      fullWidth={fullWidth}
      color={color}
    >
      {isLoading ? <Spinner color={color} /> : title}
    </MuiButton>
  );
}
