import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Popup.module.scss";
import DialogActions from "@material-ui/core/DialogActions";
import Button, { ButtonVariant } from "../Button";
import Text from "../Text";

export type PopupProps = {
  buttonApproveText: string;
  open: boolean;
  titleFirst: string;
  titleSecond?: string;
  className?: string;
  onBack?: () => void;
  goBackText?: string;
  onApproved: () => Promise<void>;
  image?: string;
};

export default function Popup({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
  onBack,
  onApproved,
}: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = async () => {
    setIsLoading(true);
    await onApproved();
    setIsLoading(false);
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "#272932",
          color: "#fff",
          height: "min-content",
          width: "90%",
        },
      }}
      open={open}
      onClose={onBack}
    >
      <div className={styles.popupContainer}>
        <div className={styles.popupText}>
          <Text>{titleFirst}</Text>
          <Text>{titleSecond}</Text>
        </div>
        <hr className={styles.header} />
        <DialogActions>
          {onBack && (
            <Button
              onClick={onBack}
              title="חזרה"
              className={styles.backButton}
              variant={ButtonVariant.text}
            />
          )}
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
