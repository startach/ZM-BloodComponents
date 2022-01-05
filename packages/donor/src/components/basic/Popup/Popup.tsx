import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./Popup.module.scss";
import Button, { ButtonVariant } from "../Button";
import { Color } from "../../../constants/colors";

export type PopupProps = {
  open: boolean;
  title: string;
  content?: string;
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
  buttonApproveText,
  open,
  title,
  content,
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

  if (!onClose && onBack) {
    // If no specific onClose, use onBack
    onClose = onBack;
  }

  if (content) {
    children = content;
  }

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <div className={styles.container}>
        {image && <img src={image} alt={"popup"} className={styles.image} />}
        <div className={styles.popupText}>
          <div className={styles.popupTextTitle}>{title}</div>
          <div className={styles.popupTextContent}>{children}</div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={buttonClicked}
            title={buttonApproveText}
            isLoading={isLoading}
            color={buttonColor}
          />
        </div>
        {onBack && goBackText && (
          <div className={styles.buttonContainer}>
            <Button
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
