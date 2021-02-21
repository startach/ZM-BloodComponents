import { Button as MuiButton, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";

type ButtonVariant = "text" | "outlined" | "contained";

type ButtonProps = {
  onClick: () => void;
  title: string;
  variant?: ButtonVariant;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  isFullWidth?: boolean;
};

const useButtonStyles = makeStyles({
  root: {
    borderRadius: 100,
  },
});

export default function Button({
  onClick,
  title,
  variant = "contained",
  className,
  startIcon,
  endIcon,
  isDisabled = false,
  isLoading = false,
  isFullWidth = false,
}: ButtonProps) {
  const classes = useButtonStyles();

  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color="primary"
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
