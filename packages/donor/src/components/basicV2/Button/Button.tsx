import { Button as MuiButton, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../../basic/Spinner";
import React from "react";

export type ButtonProps = {
  title: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
  border?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  isCentered?: boolean;
};

const useButtonStyles = makeStyles((theme) => ({
  buttonStyle: (props: { isCentered: boolean }) => ({
    borderRadius: 6,
    fontSize: 18,
    width: 320,
    height: 48,
    ...(props.isCentered && { display: "block" }),
    ...(props.isCentered && { margin: "0 auto" }),
  }),
}));

export default function Button({
  onClick,
  title,
  backgroundColor = "#4CAF51",
  color = "#fff",
  border = "none",
  className,
  startIcon,
  endIcon,
  isDisabled = false,
  isLoading = false,
  isCentered = false,
}: ButtonProps) {
  const classes = useButtonStyles({ isCentered });

  return (
    <MuiButton
      onClick={onClick}
      style={{ backgroundColor: backgroundColor, color: color, border: border }}
      className={classnames(className, classes.buttonStyle)}
      startIcon={!isLoading && startIcon}
      endIcon={!isLoading && endIcon}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? <Spinner /> : title}
    </MuiButton>
  );
}
