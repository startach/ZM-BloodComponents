import CoordinatorScreen from "../../components/V2/CoordinatorScreen";
import Spinner from "../../components/V2/Spinner";
import styles from "./LoadingScreen.module.scss";

export default function LoadingScreen() {
  return (
    <CoordinatorScreen className={styles.screen}>
      <Spinner size={"40px"} />
    </CoordinatorScreen>
  );
}
