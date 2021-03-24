import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Popup.module.scss";
import DialogActions from "@material-ui/core/DialogActions";
import Button, { ButtonVariant } from "../Button";
import Text from "../Text";

type DialogProps = {
  buttonApproveText: string;
  open: boolean;
  titleFirst: string;
  titleSecond?: string;
  className?: string;
  isLoading?: boolean;
  onClose: () => void;
  // Does not exist for notification, is required for popup
  onApproved?: () => Promise<void>;
  PopupButton?: React.ReactNode;
  isNotificationPopup?: boolean;
};

export default function DialogBase({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
  onClose,
  onApproved,
  PopupButton,
  isNotificationPopup,
}: DialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = async () => {
    if (onApproved) {
      setIsLoading(true);
      await onApproved();
      setIsLoading(false);
    }
    onClose();
  };
  return (
    <>
      {PopupButton}
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#272932",
            color: "#fff",
            height: "170px",
            width: "90%",
          },
        }}
        open={open}
        onClose={onClose}
      >
        <div className={styles.popupContainer}>
          <div className={styles.popupText}>
            <Text>{titleFirst}</Text>
            <Text>{titleSecond}</Text>
          </div>
          <hr className={styles.hr}></hr>
          <DialogActions>
            {!isNotificationPopup && (
              <Button
                onClick={onClose}
                title="חזרה"
                className={styles.backButton}
                variant={ButtonVariant.text}
              />
            )}
            <Button
              onClick={isNotificationPopup ? onClose : buttonClicked}
              title={buttonApproveText}
              className={styles.approveButton}
              isLoading={isLoading}
            />
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
