import { Button as MuiButton, PropTypes } from "@material-ui/core";
import classnames from "classnames";
import Spinner from "../Spinner";
import React from "react";
import styles from "./Button.module.scss";
import { reportClick, reportEvent } from "../../../Analytics";
import {
  AnalyticsButtonType,
  AnalyticsEventType,
} from "@zm-blood-components/common";

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
  /** For logging and Analytics */
  analyticsName: string;
  analyticsValue?: string;
  analyticsType?: AnalyticsButtonType;
};

export default function Button({
  onClick,
  title,
  color,
  variant = ButtonVariant.contained,
  className,
  isDisabled = false,
  isLoading = false,
  analyticsName: buttonName,
  analyticsValue: buttonValue,
  analyticsType: buttonType,
}: ButtonProps) {
  const handleDisabledButtonClick = () => {
    reportEvent(AnalyticsEventType.Click, "disabled_text_button");
  };

  const handleClick = () => {
    onClick();
    const detectedButtonType =
      variant === ButtonVariant.text
        ? AnalyticsButtonType.TextButton
        : AnalyticsButtonType.Button;
    reportClick(buttonType ?? detectedButtonType, buttonName, buttonValue);
  };

  if (variant === ButtonVariant.text) {
    return (
      <div
        className={classnames(className, styles.textButton)}
        onClick={isDisabled ? handleDisabledButtonClick : handleClick}
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
      onClick={handleClick}
      className={classnames(className, styles.button)}
      disabled={isDisabled || isLoading}
      variant={variant}
      fullWidth
      color={selectedColor}
      disableElevation
    >
      {isLoading ? (
        <Spinner color={selectedColor} />
      ) : (
        <div className={styles.buttonText}>{title}</div>
      )}
    </MuiButton>
  );
}
