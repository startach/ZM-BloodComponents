import { Button as MuiButton, makeStyles, PropTypes } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";

export enum ButtonVariant {
  text = "text",
  outlined = "outlined",
  contained = "contained",
}

export type ButtonProps = {
  onClick: () => void;
  title: string;
  /** Text - clickable text, Outlined - Inside out, or Contained (Default) */
  variant?: ButtonVariant;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
  color?: PropTypes.Color;
};

const useButtonStyles = makeStyles({
  root: {
    borderRadius: 100,
  },
});

export default function Button({
  onClick,
  title,
  color,
  variant = ButtonVariant.contained,
  className,
  startIcon,
  endIcon,
  isDisabled = false,
  isLoading = false,
  isFullWidth = false,
}: ButtonProps) {
  const classes = useButtonStyles();

  let selectedColor: PropTypes.Color;
  if (color) {
    selectedColor = color;
  } else {
    selectedColor = "primary";
  }

  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color={selectedColor}
      className={classnames(className, classes.root)}
      startIcon={!isLoading && startIcon}
      endIcon={!isLoading && endIcon}
      disabled={isDisabled || isLoading}
      fullWidth={isFullWidth}
    >
      {isLoading ? <Spinner /> : title}
    </MuiButton>
  );
}
