import { Dialog } from "@material-ui/core";
import React from "react";
import styles from "./Popup.module.scss";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "../Button";
import Text from "../Text";

type PopupProps = {
  buttonApproveText: string;
  open: boolean;
  titleFirst: string;
  titleSecond?: string;
  className?: string;
  onClose: () => void;
  PopupButton?: React.ReactNode;
};

export function NotificationPopup({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
  onClose,
  PopupButton,
}: PopupProps) {
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
              title={buttonApproveText}
              className={styles.approveButton}
            />
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
