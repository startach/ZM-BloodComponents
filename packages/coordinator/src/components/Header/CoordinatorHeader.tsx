import Button from "../Button";
import { useEffect, useState } from "react";
import styles from "./CoordinatorHeader.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import EmptyCoordinatorHeader from "./EmptyCoordinatorHeader";

export interface HeaderButtonFlags {
  isLoggedIn: boolean;
  showAddAppointments: boolean;
  showOpenAppointments: boolean;
  showSearchDonors: boolean;
  showBookedAppointments: boolean;
}

interface CoordinatorHeaderProps {
  onSignOut: () => void;
  flags: HeaderButtonFlags;
  getEmail: () => string | undefined;
}

export default function CoordinatorHeader({
  flags,
  onSignOut,
  getEmail,
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

  const navigate = (screen: CoordinatorScreenKey) => () =>
    history.push("/" + screen);

  const email = getEmail();

  return (
    <EmptyCoordinatorHeader>
      <div className={styles.buttons}>
        <div className={styles.mainButtons}>
          {flags.showAddAppointments && (
            <Button
              className={currentTab === "/home" ? styles.selected__tab : ""}
              title="הוספת תורים"
              onClick={navigate(CoordinatorScreenKey.ADD_APPOINTMENTS)}
            />
          )}
          {flags.showOpenAppointments && (
            <Button
              title="תורים מתוכננים"
              onClick={navigate(CoordinatorScreenKey.SCHEDULED_APPOINTMENTS)}
              className={
                currentTab === "/appointments" ? styles.selected__tab : ""
              }
            />
          )}
          {flags.showSearchDonors && (
            <Button
              className={currentTab === "/donors" ? styles.selected__tab : ""}
              title="חיפוש משתמשים"
              onClick={navigate(CoordinatorScreenKey.DONORS)}
            />
          )}
          {flags.showBookedAppointments && (
            <Button
              className={
                currentTab === "/booked-donations" ? styles.selected__tab : ""
              }
              title={`דוח"ות`}
              onClick={navigate(CoordinatorScreenKey.BOOKED_DONATIONS)}
            />
          )}
        </div>
        {flags.isLoggedIn && (
          <div className={styles.loggedIn}>
            <div>{email}</div>
            <Button title="התנתק" onClick={onSignOut} />
          </div>
        )}
      </div>
    </EmptyCoordinatorHeader>
  );
}
