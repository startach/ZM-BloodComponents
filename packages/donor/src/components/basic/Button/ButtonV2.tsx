import { Button as MuiButton, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";
import { ButtonProps, ButtonVariant } from "./Button";

const getbuttonproperties = (variant: string, color: string) => {
  let buttonTxtColor: string;
  let border: string;
  let buttonBackgroundColor: string;

  switch (color) {
    case "secondaryPink":
      color = "#CB007B";
      break;
    case "secondaryGrey":
      color = "#707070";
      break;
    default:
      color = "#4CAF50";
      break;
  }
  switch (variant) {
    case "outlined":
      buttonTxtColor = color;
      buttonBackgroundColor = "#fff";
      border = "1px solid " + color;
      break;

    case "disabled":
      buttonTxtColor = "#00000042";
      buttonBackgroundColor = "#E7ECEF80";
      border = "none";
      break;

    default:
      buttonTxtColor = "#fff";
      buttonBackgroundColor = color;
      border = "none";
      break;
  }
  return {
    buttonTxtColor,
    buttonBackgroundColor,
    border,
  };
};

const useButtonStyles = makeStyles({
  root: (props: { variant: string; color: string; isCentered: boolean }) => {
    const { buttonTxtColor, buttonBackgroundColor, border } =
      getbuttonproperties(props.variant, props.color);
    return {
      color: buttonTxtColor,
      backgroundColor: buttonBackgroundColor,
      border: border,
      borderRadius: 6,
      fontSize: 18,
      width: 320,
      height: 48,
      ...(props.isCentered && { display: "block" }),
      ...(props.isCentered && { margin: "0 auto" }),
    };
  },
});

export default function ButtonV2({
  onClick,
  title,
  variant = ButtonVariant.contained,
  className,
  startIcon,
  endIcon,
  isDisabled = false,
  isLoading = false,
  isCentered = false,
}: ButtonProps) {
  const classes = useButtonStyles({
    color: "#fff",
    variant,
    isCentered,
  });

  return (
    <MuiButton
      onClick={onClick}
      className={classnames(className, classes.root)}
      startIcon={!isLoading && startIcon}
      endIcon={!isLoading && endIcon}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? <Spinner /> : title}
    </MuiButton>
  );
}
