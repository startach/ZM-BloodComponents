import {Dialog} from "@material-ui/core";
import {useState} from "react";
import styles from "./Popup.module.scss";
import Button, {ButtonVariant} from "../Button";

export type PopupProps = {
  open: boolean;
  title: string;
  content?: string;
  buttonApproveText: string;
  onApproved: () => Promise<void>;
  goBackText?: string;
  onBack?: () => void;
  className?: string;
  image?: string;
};

export default function Popup({
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
        {image && <img src={image} alt={"popup"} className={styles.image} />}
        <div className={styles.popupText}>
          <div className={styles.popupTextTitle}>{title}</div>
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
