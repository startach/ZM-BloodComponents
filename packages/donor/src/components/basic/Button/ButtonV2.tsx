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
  if (variant === ButtonVariant.text) {
    return (
      <div
        className={classnames(className, styles.textButton)}
        onClick={isDisabled ? undefined : onClick}
      >
        {title}
      </div>
    );
  }

  let selectedColor: PropTypes.Color;
  if (color) {
    selectedColor = color;
  } else {
    selectedColor = "primary";
  }

  return (
    <MuiButton
      onClick={onClick}
      className={classnames(className, styles.button)}
      disabled={isDisabled || isLoading}
      variant={variant}
      fullWidth
      color={selectedColor}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.buttonText}>{title}</div>
      )}
    </MuiButton>
  );
}
