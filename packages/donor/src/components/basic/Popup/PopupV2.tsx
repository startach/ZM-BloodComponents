import { Dialog } from "@material-ui/core";
import { useState } from "react";
import styles from "./Popup.module.scss";
import { ButtonVariant } from "../Button";
import { PopupProps } from "./Popup";
import ButtonV2 from "../Button/ButtonV2";

export default function PopupV2({
  buttonApproveText,
  open,
  titleFirst,
  titleSecond,
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
        {image && <img src={image} alt={"image"} />}
        <div className={styles.popupText}>
          <h2>{titleFirst}</h2>
          <div>{titleSecond}</div>
        </div>
        <div className={styles.buttonContainer}>
          <ButtonV2
            onClick={buttonClicked}
            title={buttonApproveText}
            isLoading={isLoading}
          />
        </div>
        {onBack && goBackText && (
          <div className={styles.buttonContainer}>
            <ButtonV2
              onClick={onBack}
              title={goBackText}
              isLoading={isLoading}
              variant={ButtonVariant.text}
              color={"default"}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
