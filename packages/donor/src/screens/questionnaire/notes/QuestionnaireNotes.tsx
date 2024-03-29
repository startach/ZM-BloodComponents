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
            ינתן כרטיס חניה בחניון סורוקה בעת התרומה. אם חל שינוי במצבך ואין
            ביכולתך לתרום אנא בטל/י את התור.
          </div>
        </>
      );

    case Hospital.TEL_HASHOMER:
      return (
        <>
          <div className={styles.notesTitle}>ידוע לי שאוכל לתרום רק אם:</div>

          <div className={styles.notesText}>
            <li>אין לי פצע פתוח/שריטה.</li>
            <li>לא נטלתי אנטיביוטיקה ב-3 הימים שלפני התרומה.</li>
            <li>
              לא עברתי טיפול שיניים ב-10 הימים שלפני התרומה (סתימה ושיננית עד 24
              שעות).
            </li>
          </div>

          <div className={styles.notesDetails}>
            לבאים ברכב פרטי ינתן כרטיס חניה לחניון תל השומר.
          </div>
        </>
      );

    case Hospital.HADASA_EIN_KEREM:
      return (
        <>
          <div className={styles.notesTitle}>ידוע לי שאוכל לתרום רק אם:</div>

          <div className={styles.notesText}>
            <li>אין לי שריטה מדממת.</li>
            <li>לא נטלתי אנטיביוטיקה בשבוע שלפני התרומה.</li>
            <li>לא נטלתי משככי כאבים ב-3 הימים שלפני התרומה.</li>
            <li>אני מרגיש/ה מצוין ב-3 הימים שלפני התרומה.</li>
            <li>
              לא עברתי טיפול שיניים ב-10 הימים שלפני התרומה (סתימה ושיננית עד 24
              שעות).
            </li>
          </div>

          <div className={styles.notesDetails}>
            ינתן פתרון חניה לבאים ברכב. במידה ואין איך להגיע, ניתנת אפשרות להסעה
            בתוך ירושלים. נא ליצור קשר בטלפון: 052−6900091.
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
        <li>
          לא עברתי טיפול שיניים ב-10 הימים שלפני התרומה (סתימה ושיננית עד 24
          שעות).
        </li>
      </div>

      <div className={styles.notesDetails}>
        ינתן פתרון הסעה למגיעים. אם אין ביכולתך להגיע לתרום, אנא בטל/י את התור.
      </div>
    </>
  );
}
