import styles from "./AboutScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import AllLogos from "./../../assets/images/all logos.svg";

export default function AboutScreen() {
  return (
    <ZMScreen hasBackButton title="אודות" fullWidth>
      <div className={styles.imageContainer}>
        <img src={AllLogos} alt={"logo"} className={styles.image} />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.title}>על עמותת "זכרון מנחם" והאפליקציה</div>
        <br />
        אנו בעמותת "זכרון מנחם" עוסקים בתמיכה בילדים חולי סרטן ובני משפחותיהם
        במגוון דרכים: תמיכה נפשית ורפואית, ימי כיף, מחנות נופש, מרכזי יום,
        סדנאות, תרומות שיער ועוד (היכנסו ל
        <a href="https://zichron.org" className={styles.link}>
          אתרנו
        </a>{" "}
        למידע נוסף).
        <br />
        <br />
        אפליקציה זו יועדה עבור תורמי הטרומבוציטים של העמותה – המגיעים לתרומה
        חד-פעמית, או באופן קבוע מספר פעמים בשנה – ועוזרים להציל חיים של אנשים.
        <br />
        <br />
        האפליקציה מאפשרת לכם לצפות במועדים הפנויים לתרומה בבית החולים המועדף
        עליכם, להירשם לתור, ואף לבקש הסעה ממקום מגוריכם אל בית החולים וחזרה. כי
        זה מגיע לתורמים שלנו.
        <br />
        <br />
        האפליקציה מפותחת ע"י מתנדבי עמותת{" "}
        <a href="https://www.startach.org.il/" className={styles.link}>
          סטארט-אח
        </a>
        . מוזמנים לבקר אותנו גם{" "}
        <a href="https://www.facebook.com/StartAchCom" className={styles.link}>
          בפייסבוק
        </a>
        !
        <br />
        <br />
        תודה לכל התורמים, צוות "בנק מרכיבי הדם" של עמותת זכרון מנחם.
      </div>
    </ZMScreen>
  );
}
