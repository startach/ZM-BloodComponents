import { Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./Popup.module.scss";
import Button, { ButtonVariant } from "../Button";
import { Color } from "../../../constants/colors";
import { reportEvent } from "../../../Analytics";
import {
  AnalyticsButtonType,
  AnalyticsEventType,
} from "@zm-blood-components/common";

export type PopupProps = {
  /** For logging and Analytics */
  name: string;
  open: boolean;
  title: string;
  children?: React.ReactNode;
  buttonApproveText: string;
  onApproved: () => void | Promise<void>;
  goBackText?: string;
  // Called when pressing the (optional) go back button
  onBack?: () => void;
  // Called when pressing outside the popup
  onClose?: () => void;
  className?: string;
  image?: string;
  buttonColor?: Color;
};

export default function Popup({
  name,
  buttonApproveText,
  open,
  title,
  children,
  onBack,
  goBackText,
  onClose,
  onApproved,
  image,
  buttonColor = Color.Primary,
}: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = async () => {
    setIsLoading(true);
    await onApproved();
    setIsLoading(false);
  };

  useEffect(() => {
    reportEvent(
      AnalyticsEventType.PopupChange,
      `${name}_visibility_open`,
      String(open)
    );
  }, [open, name]);

  return (
    <Dialog fullWidth open={open} onClose={onClose || onBack}>
      <div className={styles.container}>
        {image && <img src={image} alt={"popup"} className={styles.image} />}
        <div className={styles.popupText}>
          <div className={styles.popupTextTitle}>{title}</div>
          <div className={styles.popupTextContent}>{children}</div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            analyticsName={`${name}_approve`}
            analyticsType={AnalyticsButtonType.Popup}
            onClick={buttonClicked}
            title={buttonApproveText}
            isLoading={isLoading}
            color={buttonColor}
          />
        </div>
        {onBack && goBackText && (
          <div className={styles.buttonContainer}>
            <Button
              analyticsName={`${name}_go_back`}
              analyticsType={AnalyticsButtonType.Popup}
              onClick={onBack}
              title={goBackText}
              isDisabled={isLoading}
              variant={ButtonVariant.text}
              color={"default"}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
