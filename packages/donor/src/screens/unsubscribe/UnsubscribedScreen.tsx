import React from "react";
import { Link } from "react-router-dom";
import { Donor } from "@zm-blood-components/common";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import zmDrop from "../../assets/images/zmDrop.svg";
import styles from "./UnsubscribedScreen.module.scss";

export interface UnsubscribedScreenProps {
  isLoggedIn: boolean;
  user?: Donor;
}

const UnsubscribedScreen = (props: UnsubscribedScreenProps) => {
  const { user, isLoggedIn } = props;
  const profileLink = <Link to={MainNavigationKeys.MyProfile}>הפרופיל</Link>;
  const GOODBYE = "להתראות !";
  const EMAIL_REMOVED = `${
    isLoggedIn ? user?.email : "האימייל שלך"
  } הוסר בהצלחה מרשימת התפוצה של בנק מרכיבי הדם`;
  const REGRET = "התחרטת? תמיד נשמח שוב לראותך!";
  const RENEW = <>ניתן לחדש את ההרשמה לתפוצה בעמוד {profileLink} באפליקציה</>;

  return (
    <div className={styles.Unsubscribed}>
      <div className={styles.Content}>
        <div className={styles.UpperContent}>
          <img src={zmDrop} alt={"logo"} />
          <div className={styles.Goodbye}>{GOODBYE}</div>
          <div className={styles.Success}>{EMAIL_REMOVED}</div>
        </div>
        <div className={styles.FooterContent}>
          <div className={styles.Regret}>{REGRET}</div>
          <div className={styles.Renew}>{RENEW}</div>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribedScreen;
