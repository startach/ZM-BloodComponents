import Button, { ButtonVariant, ButtonProps } from "../Button";
import { useEffect, useState } from "react";
import styles from "./CoordinatorHeader.module.scss";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import EmptyCoordinatorHeader from "./EmptyCoordinatorHeader";
import { Units } from "../../constants/Units";
import logoImg from "../../assets/logo.svg";
import titleImg from "../../assets/blood-bank-zichron-Little-logo.svg";
import { Coordinator } from "@zm-blood-components/common";

export interface HeaderButtonFlags {
  isLoggedIn: boolean;
  showAddAppointments: boolean;
  showOpenAppointments: boolean;
  showSearchDonors: boolean;
  showBookedAppointments: boolean;
}

export interface CoordinatorHeaderProps {
  onSignOut: () => void;
  flags: HeaderButtonFlags;
  getEmail: () => string | undefined;
  coordinator: Coordinator | undefined;
  currentLocationPathname: string;
  navigate: (screen: CoordinatorScreenKey) => () => void;
}

export default function CoordinatorHeader({
  flags,
  onSignOut,
  getEmail,
  coordinator,
  currentLocationPathname,
  navigate,
}: CoordinatorHeaderProps) {
  const [currentTab, setCurrentTab] = useState("/home");

  useEffect(() => {
    if (currentLocationPathname === "/") {
      setCurrentTab("/home");
      return;
    }
    setCurrentTab(currentLocationPathname);
  }, [currentLocationPathname]);

  const name = coordinator?.name || getEmail();

  const TextButton = (buttonProps: ButtonProps) => (
    <Button variant={ButtonVariant.text} {...buttonProps} />
  );

  if (window.innerWidth < Units.phoneWidth) {
    return <MobileHeader />;
  }

  return (
    <EmptyCoordinatorHeader>
      <div className={styles.buttons}>
        <div className={styles.mainButtons}>
          {flags.showAddAppointments && (
            <TextButton
              className={currentTab === "/home" ? styles.selected__tab : ""}
              title="הוספת תורים"
              onClick={navigate(CoordinatorScreenKey.ADD_APPOINTMENTS)}
            />
          )}
          {flags.showOpenAppointments && (
            <TextButton
              title="תורים מתוכננים"
              onClick={navigate(CoordinatorScreenKey.SCHEDULED_APPOINTMENTS)}
              className={
                currentTab === "/appointments" ? styles.selected__tab : ""
              }
            />
          )}
          {flags.showSearchDonors && (
            <TextButton
              className={currentTab === "/donors" ? styles.selected__tab : ""}
              title="חיפוש משתמשים"
              onClick={navigate(CoordinatorScreenKey.DONORS)}
            />
          )}
          {flags.showBookedAppointments && (
            <TextButton
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
            <div>{name}</div>
            <TextButton title="התנתק" onClick={onSignOut} />
          </div>
        )}
      </div>
    </EmptyCoordinatorHeader>
  );

  function MobileHeader() {
    return (
      <div className={styles.navBar}>
        <div className={styles.logoContainer}>
          <img src={logoImg} className={styles.logo} alt={"logo"} />
          <img src={titleImg} alt={"title"} className={styles.title} />
          {flags.isLoggedIn && (
            <div className={styles.loggedIn}>
              <div className={styles.name}>{name}</div>
              <TextButton
                className={styles.selected__tab}
                title="התנתק"
                onClick={onSignOut}
              />
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          {flags.showAddAppointments && (
            <TextButton
              className={currentTab === "/home" ? styles.selected__tab : ""}
              title="הוספת תורים"
              onClick={navigate(CoordinatorScreenKey.ADD_APPOINTMENTS)}
            />
          )}
          {flags.showOpenAppointments && (
            <TextButton
              title="תורים מתוכננים"
              onClick={navigate(CoordinatorScreenKey.SCHEDULED_APPOINTMENTS)}
              className={
                currentTab === "/appointments" ? styles.selected__tab : ""
              }
            />
          )}
          {flags.showSearchDonors && (
            <TextButton
              className={currentTab === "/donors" ? styles.selected__tab : ""}
              title="חיפוש משתמשים"
              onClick={navigate(CoordinatorScreenKey.DONORS)}
            />
          )}
          {flags.showBookedAppointments && (
            <TextButton
              className={
                currentTab === "/booked-donations" ? styles.selected__tab : ""
              }
              title={`דוח"ות`}
              onClick={navigate(CoordinatorScreenKey.BOOKED_DONATIONS)}
            />
          )}
        </div>
      </div>
    );
  }
}
