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
    <div
      style={{
        zIndex: 100,
        position: "absolute",
        bottom: "50px",
        left: "5%",
      }}
    >
      <Fade in={showFlash} timeout={{ enter: 300, exit: 800 }}>
        <div className={styles.flashMessage}>{message}</div>
      </Fade>
    </div>
  );
}
