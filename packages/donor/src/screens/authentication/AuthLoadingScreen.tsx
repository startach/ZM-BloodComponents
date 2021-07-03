import styles from "./AuthLoadingScreen.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";

import startachLogo from "../../assets/mobile/startach_logo.svg";
import zmLogo from "../../assets/mobile/zm_logo.svg";

import splashAnimation from "../../assets/animations/splash_logo.json";

export default function AuthLoadingScreen() {
  return (
    <div className={styles.component}>
      <Player
        autoplay
        loop
        src={splashAnimation}
        style={{ height: "300px", width: "300px" }}
      />
      <div className={styles.bottomContainer}>
        <img alt={"זיכרון מנחם"} src={zmLogo} />
        <img alt={"סטארט אח"} src={startachLogo} />
      </div>
    </div>
  );
}
