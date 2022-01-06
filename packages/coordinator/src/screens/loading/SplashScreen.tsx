import styles from "./SplashScreen.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";

import startachLogo from "../../assets/startach_logo.png";
import zmLogo from "../../assets/zm_logo.svg";

import splashAnimation from "../../assets/animations/splash_logo.json";

export default function SplashScreen() {
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
        <img width="64" height="59" alt={"סטארט אח"} src={startachLogo} />
      </div>
    </div>
  );
}
