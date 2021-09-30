import { Fade } from "@material-ui/core";
import styles from "./Popup.module.scss";

type PopupFlashMessageProps = {
  message: string;
  showFlash: boolean;
  hide: () => void;
};

export default function PopupFlashMessage({
  message,
  showFlash,
  hide,
}: PopupFlashMessageProps) {
  if (showFlash) {
    setTimeout(() => {
      hide();
    }, 700);
  }

  return (
    <div className={styles.flashMessageContainer}>
      <Fade in={showFlash} timeout={{ enter: 300, exit: 800 }}>
        <div className={styles.flashMessage}>{message}</div>
      </Fade>
    </div>
  );
}
