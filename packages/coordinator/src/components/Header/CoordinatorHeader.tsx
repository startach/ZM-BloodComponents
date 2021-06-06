import Button from "../Button";
import { useState, useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import styles from "./CoordinatorHeader.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import { CoordinatorScreen } from "../../navigation/CoordinatorScreen";

export interface HeaderButtonFlags {
  showSignOutButton: boolean;
  showAddAppointments: boolean;
  showOpenAppointments: boolean;
  showSearchDonors: boolean;
  showBookedAppointments: boolean;
}

interface CoordinatorHeaderProps {
  onSignOut: () => void;
  flags: HeaderButtonFlags;
}

export default function CoordinatorHeader({
  flags,
  onSignOut,
}: CoordinatorHeaderProps) {
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
        <div className={styles.mainButtons}>
          {flags.showAddAppointments && (
            <Button
              className={currentTab === "/home" ? styles.selected__tab : ""}
              title="הוספת תורים"
              onClick={navigate(CoordinatorScreen.ADD_APPOINTMENTS)}
            />
          )}
          {flags.showOpenAppointments && (
            <Button
              title="תורים מתוכננים"
              onClick={navigate(CoordinatorScreen.SCHEDULED_APPOINTMENTS)}
              className={
                currentTab === "/appointments" ? styles.selected__tab : ""
              }
            />
          )}
          {flags.showSearchDonors && (
            <Button
              className={currentTab === "/donors" ? styles.selected__tab : ""}
              title="חיפוש משתמשים"
              onClick={navigate(CoordinatorScreen.DONORS)}
            />
          )}
          {flags.showBookedAppointments && (
            <Button
              className={
                currentTab === "/booked-donations" ? styles.selected__tab : ""
              }
              title={`דוח"ות`}
              onClick={navigate(CoordinatorScreen.BOOKED_DONATIONS)}
            />
          )}
        </div>
        {flags.showSignOutButton && (
          <div className={styles.disconnect}>
            <Button title="התנתק" onClick={onSignOut} />
          </div>
        )}
      </div>
    </div>
  );
}
