import { Button as MuiButton, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";

export enum ButtonVariant {
  text = "text",
  outlined = "outlined",
  contained = "contained",
}

type ButtonProps = {
  title: string;
  onClick: () => void;
  /** Text - clickable text, Outlined - Inside out, or Contained (Default) */
  variant?: ButtonVariant;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
  isCentered?: boolean;
};

const useButtonStyles = makeStyles((theme) => ({
  buttonStyle: (props: { isCentered: boolean }) => ({
    borderRadius: 100,
    ...(props.isCentered && { display: "block" }),
    ...(props.isCentered && { margin: "0 auto" }),
  }),
}));

export default function Button({
  onClick,
  title,
  variant = ButtonVariant.contained,
  className,
  startIcon,
  endIcon,
  isDisabled = false,
  isLoading = false,
  isFullWidth = false,
  isCentered = false,
}: ButtonProps) {
  const classes = useButtonStyles({ isCentered });

  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color="primary"
      className={classnames(className, classes.buttonStyle)}
      startIcon={!isLoading && startIcon}
      endIcon={!isLoading && endIcon}
      disabled={isDisabled || isLoading}
      fullWidth={isFullWidth}
    >
      {isLoading ? <Spinner /> : title}
    </MuiButton>
  );
}
