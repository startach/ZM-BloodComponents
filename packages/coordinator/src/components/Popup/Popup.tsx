import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Popup.module.scss";
import DialogActions from "@material-ui/core/DialogActions";
import Button, { ButtonVariant } from "../Button";
import Text from "../Text";

type PopupProps = {
  buttonApproveText: string;
  open: boolean;
  titleFirst: string;
  titleSecond?: string;
  className?: string;
  isLoading?: boolean;
  onClose: () => void;
  onApproved: () => void;
  PopupButton?: React.ReactNode;
};

export default function Popup({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
  onClose,
  onApproved,
  PopupButton,
}: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = () => {
    setIsLoading(true);
    onApproved();
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
    </>
  );
}
