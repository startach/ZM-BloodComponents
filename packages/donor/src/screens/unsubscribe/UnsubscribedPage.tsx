import React from "react";
import zmDrop from "../../assets/images/zmDrop.svg";
import styles from "./UnsubscribedPage.module.scss";

export const UnsubscribedPage = () => {
    const GOODBYE = "להתראות !";
    const EMAIL_REMOVED = "האימייל שלך \nהוסר בהצלחה מרשימת התפוצה של בנק מרכיבי הדם";
    const REGRET = "התחרטת? תמיד נשמח שוב לראותך!";
    const RENEW = "ניתן לחדש את  ההרשמה לתפוצה  בעמוד הפרופיל באפליקציה";

    return (
        <div className={styles.Unsubscribed}> 
            <div className={styles.UpperContent}>
                <img src={zmDrop} alt={"logo"}/>
                <span className={styles.Goodbye}>{GOODBYE}</span>
                <div className={styles.Success}>{EMAIL_REMOVED}</div>
            </div>
            <div className={styles.FooterContent}>
                <span className={styles.REGRET}>{REGRET}</span>
                <span className={styles.RENEW}>{RENEW}</span>
            </div>
        </div>
    )

} 



