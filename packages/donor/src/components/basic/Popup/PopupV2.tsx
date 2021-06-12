import { Dialog } from "@material-ui/core";
import { useState } from "react";
import styles from "./Popup.module.scss";
import { ButtonVariant } from "../Button";
import { PopupProps } from "./Popup";
import Button from "../Button";

export default function PopupV2({
  buttonApproveText,
  open,
  title,
  content,
  onBack,
  onApproved,
  goBackText,
  image,
}: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClicked = async () => {
    setIsLoading(true);
    await onApproved();
    setIsLoading(false);
  };

  return (
    <Dialog fullWidth open={open} onClose={onBack}>
      <div className={styles.container}>
        {image && <img src={image} alt={"popup"} />}
        <div className={styles.popupText}>
          <h2>{title}</h2>
          <div>{content}</div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={buttonClicked}
            title={buttonApproveText}
            isLoading={isLoading}
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
