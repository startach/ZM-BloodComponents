import React from "react";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import Button, { ButtonVariant } from "../../components/basic/Button";
import { useNavigate } from "react-router-dom";
import zmDrop from "../../assets/images/zmDrop.svg";
import styles from "./UnsubscribedScreen.module.scss";

const UnsubscribedScreen = () => {
  const navigate = useNavigate();

  const profileLink = (
    <Button
      onClick={() => navigate(MainNavigationKeys.MyProfile)}
      title={"הפרופיל"}
      variant={ButtonVariant.text}
      className={styles.ProfileLink}
    />
  );
  const GOODBYE = "להתראות !";
  const EMAIL_REMOVED = "האימייל שלך הוסר בהצלחה מרשימת התפוצה";
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