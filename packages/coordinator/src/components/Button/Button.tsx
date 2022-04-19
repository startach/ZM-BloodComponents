import { Button as MuiButton } from "@mui/material";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";
import styles from "./Button.module.scss";

export enum ButtonVariant {
  text = "text",
  outlined = "outlined",
  contained = "contained",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = {
  title: string;
  onClick: () => void;
  /** Text - clickable text, Outlined - Inside out, or Contained (Default) */
  variant?: ButtonVariant;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  color?: ButtonColor;
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

  const buttonClasses = [styles.button];
  if (isDisabled || isLoading) {
    buttonClasses.push(styles.disabledButton);
  } else if (variant === ButtonVariant.outlined) {
    buttonClasses.push(styles.outlinedButton);
  } else {
    switch (color) {
      case ButtonColor.secondary:
        buttonClasses.push(styles.secondaryButton);
        break;

      case ButtonColor.primary:
      default:
        buttonClasses.push(styles.primaryButton);
        break;
    }
  }

  return (
    <div className={className}>
      <MuiButton
        onClick={onClick}
        className={classnames(buttonClasses)}
        disabled={isDisabled || isLoading}
        variant={variant}
        fullWidth
        // color={selectedColor}
        disableElevation
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.buttonText}>{title}</div>
        )}
      </MuiButton>
    </div>
  );
}
