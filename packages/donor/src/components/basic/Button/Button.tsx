import { Button as MuiButton, PropTypes } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";
import styles from "./Button.module.scss";

export enum ButtonVariant {
  text = "text",
  outlined = "outlined",
  contained = "contained",
}

export type ButtonProps = {
  title: string;
  onClick: () => void;
  /** Text - clickable text, Outlined - Inside out, or Contained (Default) */
  variant?: ButtonVariant;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  color?: PropTypes.Color;
};

export default function Button({
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
      disableElevation
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.buttonText}>{title}</div>
      )}
    </MuiButton>
  );
}
