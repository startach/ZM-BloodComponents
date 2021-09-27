import { Fade } from "@material-ui/core";
import styles from "./Popup.module.scss";

type PopupFlashMessageProps = {
  message: string;
  showFlash: boolean;
};

export default function PopupFlashMessage({
  message,
  showFlash,
}: PopupFlashMessageProps) {
  return (
    <div className={styles.flashMessageContainer}>
      <Fade in={showFlash} timeout={{ enter: 300, exit: 800 }}>
        <div className={styles.flashMessage}>{message}</div>
      </Fade>
    </div>
  );
}
