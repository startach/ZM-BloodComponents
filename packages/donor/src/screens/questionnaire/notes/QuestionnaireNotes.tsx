import React from "react";
import styles from "./QuestionnaireNotes.module.scss";
import { Hospital } from "@zm-blood-components/common";

export interface QuestionnaireNotesProps {
  hospital: Hospital;
}

export default function QuestionnaireNotes({
  hospital,
}: QuestionnaireNotesProps) {
  switch (hospital) {
    case Hospital.BEILINSON:
      return (
        <>
          <div className={styles.notesTitle}>ידוע לי שאוכל לתרום רק אם:</div>

          <div className={styles.notesText}>
            <li>אין לי פצע פתוח/שריטה.</li>
            <li>לא נטלתי אנטיביוטיקה, אדויל ונורופן ב-3 הימים שלפני התרומה.</li>
            <li>
              לא עברתי טיפול שיניים ב-10 הימים שלפני התרומה (סתימה ושיננית עד 24
              שעות).
            </li>
          </div>

          <div className={styles.notesDetails}>
            ינתן שירות הסעה במונית / חניה בחניוני עובדי בילינסון למגיעים ברכב.
            אם חל שינוי במצבך ואין ביכולתך לתרום אנא בטל/י את התור.
          </div>
        </>
      );

    case Hospital.ICHILOV:
      return (
        <>
          <div className={styles.notesTitle}>ידוע לי שאוכל לתרום רק אם:</div>

          <div className={styles.notesText}>
            <li>אין לי פצע פתוח/שריטה.</li>
            <li>לא נטלתי אנטיביוטיקה ב-10 ימים שלפני התרומה.</li>
            <li>לא עברתי טיפול שיניים ב-10 ימים שלפני התרומה.</li>
          </div>

          <div className={styles.notesDetails}>
            ינתן שירות הסעה במונית / פתרון חניה למגיעים ברכב. אם חל שינוי במצבך
            ואין ביכולתך לתרום אנא בטל/י את התור.
          </div>
        </>
      );

    case Hospital.SOROKA:
      return (
        <>
          <div className={styles.notesTitle}>ידוע לי שאוכל לתרום רק אם:</div>

          <div className={styles.notesText}>
            <li>אין לי פצע פתוח/שריטה.</li>
            <li>
              לא נטלתי אנטיביוטיקה, אדויל, נורופן ואקמול פוקוס ב-3 הימים שלפני
              התרומה.
            </li>
            <li>
              לא עברתי טיפול שיניים ב-10 הימים שלפני התרומה (סתימה ושיננית עד 24
              שעות).
            </li>
          </div>

          <div className={styles.notesDetails}>
            ינתן כרטיס חניה בחניות סורוקה בעת התרומה. אם חל שינוי במצבך ואין
            ביכולתך לתרום אנא בטל/י את התור.
          </div>
        </>
      );
  }

  return (
    <>
      <div className={styles.notesTitle}>ידוע לי שאוכל לתרום רק אם:</div>

      <div className={styles.notesText}>
        <li>אין לי פצע פתוח/שריטה.</li>
        <li>לא נטלתי אנטיביוטיקה, אדויל ונורופן ב-3 הימים שלפני התרומה.</li>
        <li>לא עברתי טיפול שיניים ב-10 ימים שלפני התרומה.</li>
      </div>

      <div className={styles.notesDetails}>
        ינתן שירות הסעה במונית / פתרון חניה למגיעים ברכב. אם חל שינוי במצבך ואין
        ביכולתך לתרום אנא בטל/י את התור.
      </div>
    </>
  );
}
