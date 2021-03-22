import Logo from "../logo/Logo";
import Styles from "./AuthLoadingScreen.module.scss";

export default function AuthLoadingScreen() {
  return (
    <div className={Styles["logo"]}>
      <Logo size={"large"} />
    </div>
  );
}
