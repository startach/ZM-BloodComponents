import Logo from "../logo/Logo";
import styles from "./AuthLoadingScreen.module.scss";

export default function AuthLoadingScreen() {
  return (
    <div className={styles.logo}>
      <Logo size={"large"} />
    </div>
  );
}
