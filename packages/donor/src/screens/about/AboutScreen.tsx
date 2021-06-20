import Text from "../../components/basic/Text";
import styles from "./AboutScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import classnames from "classnames";
import Logo from "../logo/Logo";

export default function AboutScreen() {
  return (
    <ZMScreen hasBackButton title="אודות">
      <Logo />
      <Text className={classnames(styles.textBold, styles.textContainer)}>
        על עמותת "זכרון מנחם" והאפליקציה
      </Text>
      <Text className={styles.textContainer}>
        תורמי טרומבוציטים יקרים שלום רב!
      </Text>
      <Text className={styles.textContainer}>
        {" "}
        אנו בעמותת "זכרון מנחם" עוסקים בתמיכה בילדים חולי סרטן ובני משפחותיהם
        במגוון דרכים: תמיכה נפשית ורפואית, ימי כיף, מחנות נופש, מרכזי יום,
        סדנאות, תרומות שיער ועוד (היכנסו ל
        <a href="https://zichron.org">אתרנו</a> למידע נוסף).
      </Text>
      <Text className={styles.textContainer}>
        אפליקציה זו יועדה עבור תורמי הטרומבוציטים של העמותה – המגיעים לתרומה
        חד-פעמית, או באופן קבוע מספר פעמים בשנה – ועוזרים להציל חיים של אנשים.
      </Text>
      <Text className={styles.textContainer}>
        האפליקציה מאפשרת לכם לצפות במועדים הפנויים לתרומה בבית החולים המועדף
        עליכם, להירשם לתור, ואף לבקש הסעה ממקום מגוריכם אל בית החולים וחזרה. כי
        זה מגיע לתורמים שלנו.
      </Text>
      <Text className={styles.textContainer}>
        האפליקציה מפותחת ע"י מתנדבי עמותת{" "}
        <a href="https://www.startach.org.il/">סטארט-אח</a>. מוזמנים לבקר אותנו
        גם <a href="https://www.facebook.com/StartAchCom">בפייסבוק</a>!
      </Text>
      <Text className={styles.textContainer}>
        תודה לכל התורמים, צוות "בנק מרכיבי הדם" של עמותת זכרון מנחם.
      </Text>
    </ZMScreen>
  );
}
