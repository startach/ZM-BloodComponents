import React from "react";
import { Hospital } from "@zm-blood-components/common";
import styles from "./UpcomingDonationInfo.module.scss";

export interface UpcomingDonationInfoProps {
  hospital: Hospital;
}

export default function UpcomingDonationInfo({
  hospital,
}: UpcomingDonationInfoProps) {
  switch (hospital) {
    case Hospital.BEILINSON:
      return (
        <div className={styles.moreInfo}>
          <div className={styles.moreInfoTitle}>טיפים ומידע נוסף</div>
          <li>משך התרומה - בין שעה וחצי לשעתיים.</li>
          <li>יש להביא תעודת זהות.</li>
          <li>יש לשתות מים ולאכול פירות לפני התרומה.</li>
        </div>
      );
    case Hospital.ICHILOV:
      return (
        <div className={styles.moreInfo}>
          <div className={styles.moreInfoTitle}>טיפים ומידע נוסף</div>
          <li>תרומה אורכת כשעה וחצי.</li>
          <li>ניתן לאכול ולשתות כרגיל לפני התרומה.</li>
        </div>
      );
  }

  return (
    <div className={styles.moreInfo}>
      <div className={styles.moreInfoTitle}>טיפים ומידע נוסף</div>
      <li>משך התרומה - בין שעה וחצי לשעתיים.</li>
      <li>יש להביא תעודת זהות.</li>
      <li>יש לשתות מים ולאכול פירות לפני התרומה.</li>
    </div>
  );
}
