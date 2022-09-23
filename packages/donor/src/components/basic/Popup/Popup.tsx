import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Popup.module.scss";
import Button, { ButtonVariant } from "../Button";
import { Color } from "../../../constants/colors";
import { reportEvent } from "../../../Analytics";
import {
  AnalyticsButtonType,
  AnalyticsData,
  AnalyticsEventType,
} from "@zm-blood-components/common";

export type PopupProps = {
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
  analytics: AnalyticsData;
};

export default function Popup({
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
  analytics,
}: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = async () => {
    setIsLoading(true);
    await onApproved();
    setIsLoading(false);
  };

  useEffect(() => {
    // don't run on initial (!open) render
    if (open && analytics) {
      reportEvent(
        AnalyticsEventType.IsPopupOpen,
        `${analytics.analyticsName}`,
        String(true)
      );
    }
  }, [open, analytics]);

  const handleClose = () => {
    if (analytics) {
      reportEvent(
        AnalyticsEventType.IsPopupOpen,
        `${analytics.analyticsName}`,
        String(false)
      );
    }
    if (onClose) {
      onClose();
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <div className={styles.container}>
        {image && <img src={image} alt={"popup"} className={styles.image} />}
        <div className={styles.popupText}>
          <div className={styles.popupTextTitle}>{title}</div>
          <div className={styles.popupTextContent}>{children}</div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            analytics={
              analytics && {
                analyticsName: `${analytics.analyticsName}_approve`,
                analyticsType: AnalyticsButtonType.Popup,
              }
            }
            onClick={buttonClicked}
            title={buttonApproveText}
            isLoading={isLoading}
            color={buttonColor}
          />
        </div>
        {onBack && goBackText && (
          <div className={styles.buttonContainer}>
            <Button
              analytics={
                analytics && {
                  analyticsName: `${analytics.analyticsName}_go_back`,
                  analyticsType: AnalyticsButtonType.Popup,
                }
              }
              onClick={onBack}
              title={goBackText}
              isDisabled={isLoading}
              variant={ButtonVariant.text}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
