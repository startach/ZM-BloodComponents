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
  title: string;
  onClick: () => void;
  /** Text - clickable text, Outlined - Inside out, or Contained (Default) */
  variant?: ButtonVariant;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  color?: PropTypes.Color;
};

const useButtonStyles = makeStyles(() => ({
  buttonStyle: () => ({
    borderRadius: 100,
  }),
}));

export default function Button({
  onClick,
  title,
  variant = ButtonVariant.contained,
  className,
  isDisabled = false,
  isLoading = false,
}: ButtonProps) {
  const classes = useButtonStyles();

  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color="primary"
      className={classnames(className, classes.buttonStyle)}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? <Spinner /> : title}
    </MuiButton>
  );
}
