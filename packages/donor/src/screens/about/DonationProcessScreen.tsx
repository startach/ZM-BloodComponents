import styles from "./DonationProcessScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import Illustration from "./../../assets/images/donation_proccess.svg";

export interface DonationProcessScreenProps {
  onContact: () => void;
  firstName?: string;
}

export default function DonationProcessScreen({
  firstName,
  onContact,
}: DonationProcessScreenProps) {
  let welcome_text: string = firstName
    ? `${firstName}, הנה מידע חשוב לקראת התרומה`
    : "תורמי ותורמות טרומבוציטים יקרים/ות שלום רב!";

  return (
    <ZMScreen hasBackButton title="תהליך התרומה">
      <div className={styles.imageContainer}>
        <img src={Illustration} alt={"logo"} className={styles.image} />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.title}>{welcome_text}</div>
        <br />
        לפניכם/ן הסבר על תהליך התרומה. ראשית, השתמשו באפליקציה על מנת להרשם
        למועד שמתאים לכם בבית החולים הרצוי.
        <br />
        <br />
        טרומבוציטים (טסיות דם) הינם חלק מתאי הדם המשמשים כמרכיב עיקרי במנגנון
        הקרישה של הדם. תרומת הטרומבוציטים מסייעת לחולי סרטן, בעיקר מסוג לוקמיה,
        ולחולים במחלות קשות נוספות.
        <br />
        <br />
        מנת טרומבוציטים טובה לחמישה ימים בלבד, ולכן הצורך התמידי בתרומות שוטפות.
        <br />
        <br />
        תהליך תרומת הטרומבוציטים שונה מתהליך תרומת דם רגילה. בתהליך זה נלקחים
        מגוף התורם טסיות הדם בלבד, ושאר מרכיבי הדם מוחזרים לגופו. לכן אין צורך
        לצום לפני תרומת טרומבוציטים, וכן זמן ההתאוששות בדרך כלל קצר מאוד. הגוף
        עצמו מייצר מחדש את כמות הטסיות שנתרמה בתוך יום עד יומיים.
        <br />
        <br />
        משך התרומה עצמה הינו כשעתיים, ולכן מומלץ להביא חומר קריאה, לימוד, או חבר
        שיתרום יחד אתכם ויעזור להעביר את הזמן בנעימים.
        <br />
        למידע ושאלות מוזמנים ליצור קשר באחת הדרכים בעמוד {""}
        <span onClick={onContact} className={styles.link}>
          צור קשר
        </span>
        .
      </div>
    </ZMScreen>
  );
}
