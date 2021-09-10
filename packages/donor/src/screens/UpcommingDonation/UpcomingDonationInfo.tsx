import React from "react";
import { Hospital } from "@zm-blood-components/common";
import styles from "./UpcomingDonationInfo.module.scss";

export interface UpcomingDonationInfoProps {
  hospital: Hospital;
}

export default function UpcomingDonationInfo({
  hospital,
}: UpcomingDonationInfoProps) {
  let tips: string[];

  switch (hospital) {
    case Hospital.BEILINSON:
      tips = [
        "משך התרומה - בין שעה וחצי לשעתיים.",
        "יש להביא תעודת זהות.",
        "יש לשתות מים ולאכול פירות לפני התרומה.",
      ];
      break;

    case Hospital.ICHILOV:
      tips = ["תרומה אורכת כשעה וחצי.", "ניתן לאכול ולשתות כרגיל לפני התרומה."];
      break;

    case Hospital.SOROKA:
      tips = [
        "לשאלות ובירורים ניתן לפנות ליחידת ההתרמות של סורוקה בטלפון 08−6400138.",
        "משך התרומה - בין שעה וחצי לשעתיים.",
        "יש להביא תעודת זהות.",
        "יש לשתות מים ולאכול פירות לפני התרומה.",
      ];
      break;

    case Hospital.TEL_HASHOMER:
      tips = [
        "לשאלות ובירורים ניתן לפנות ליחידת ההתרמות של סורוקה בטלפון 08−6400138.",
        "משך התרומה - בין שעה וחצי לשעתיים.",
        "יש להביא תעודת זהות.",
        "מומלץ לאכול ולשתות כרגיל לפני התרומה.",
      ];
      break;
    default:
      tips = [
        "משך התרומה - בין שעה וחצי לשעתיים.",
        "יש להביא תעודת זהות.",
        "יש לשתות מים ולאכול פירות לפני התרומה.",
      ];
  }

  return (
    <div className={styles.moreInfo}>
      <div className={styles.moreInfoTitle}>טיפים ומידע נוסף</div>
      <ul className={styles.tipList}>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
