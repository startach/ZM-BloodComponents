import CoordinatorScreen from "../../components/CoordinatorScreen";
import Spinner from "../../components/Spinner";
import styles from "./LoadingScreen.module.scss";

export default function LoadingScreen() {
  return (
    <CoordinatorScreen className={styles.screen}>
      <Spinner size={"40px"} />
    </CoordinatorScreen>
  );
}
