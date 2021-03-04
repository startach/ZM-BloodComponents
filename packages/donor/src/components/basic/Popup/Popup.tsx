import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Popup.module.scss";
import DialogActions from "@material-ui/core/DialogActions";
import Button, { ButtonVariant } from "../Button";
import Text from "../Text";

type PopupProps = {
  buttonApproveText: string;
  width: string;
  height: string;
  color: string;
  open: boolean;
  titleFirst: string;
  titleSecond: string;
  onClose: () => void;
  onCancel: () => void;
  className?: string;
  isLoading?: boolean;
};

export default function Popup({
  buttonApproveText,
  width,
  height,
  color,
  open,
  onClose,
  onCancel,
  titleFirst,
  titleSecond,
}: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = () => {
    setIsLoading(true);
    onCancel();
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "#272932",
          color: color,
          height: height,
          width: width,
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
          <Button
            onClick={onClose}
            title="חזרה"
            className={styles.backButton}
            variant={ButtonVariant.text}
          />
          <Button
            onClick={buttonClicked}
            title={buttonApproveText}
            className={styles.approveButton}
            isLoading={isLoading}
          />
        </DialogActions>
      </div>
    </Dialog>
  );
}
