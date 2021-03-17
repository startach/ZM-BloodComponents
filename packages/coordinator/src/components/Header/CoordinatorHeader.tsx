import Button from "../Button";
import { useState, useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import styles from "./CoordinatorHeader.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import { CoordinatorScreen } from "../../navigation/CoordinatorScreen";

interface CoordinatorHeaderProps {
  showSignOutButton: boolean;
  onSignOut: () => void;
}

export default function CoordinatorHeader(props: CoordinatorHeaderProps) {
  const history = useHistory();
  const location = useLocation();
  const currentLocationPathname = location.pathname;
  const [currentTab, setCurrentTab] = useState("/home");

  useEffect(() => {
    if (currentLocationPathname === "/") {
      setCurrentTab("/home");
      return;
    }
    setCurrentTab(currentLocationPathname);
  }, [currentLocationPathname]);

  const navigate = (screen: CoordinatorScreen) => () =>
    history.push("/" + screen);

  return (
    <div className={styles.navBar}>
      <div className={styles.logoContainer}>
        <img src={logoImg} className={styles.logo} alt={"logo"} />
      </div>
      <div className={styles.buttons}>
        <Button
          className={currentTab === "/home" ? styles.selected__tab : ""}
          title="הוספת תורים"
          onClick={navigate(CoordinatorScreen.ADD_APPOINTMENTS)}
        />
        <Button
          title="תורים מתוכננים"
          onClick={navigate(CoordinatorScreen.SCHEDULED_APPOINTMENTS)}
          className={currentTab === "/appointments" ? styles.selected__tab : ""}
        />
        <Button
          className={currentTab === "/donors" ? styles.selected__tab : ""}
          title="חיפוש משתמשים"
          onClick={navigate(CoordinatorScreen.DONORS)}
        />
        {props.showSignOutButton && (
          <Button title="התנתק" onClick={props.onSignOut} />
        )}
      </div>
    </div>
  );
}
