import styles from "./DonationProcessScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import Illustration from "./../../assets/images/donation_proccess.svg";

export interface DonationProcessScreenProps {}

export default function DonationProcessScreen() {
  return (
    <ZMScreen hasBackButton title="תהליך התרומה">
      <div className={styles.imageContainer}>
        <img src={Illustration} alt={"logo"} />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.title}>אמאלה, מה זה תרומת טרובוציטים?</div>
        תורמים יקרים, ריכזנו עבורכם הסבר קצר על תהליך תרומה פשוט ומהיר של
        טרומובוציטים (טסיות דם) אשר יכול להציל חיים רבים.
        <br />
        <br />
        <div className={styles.subtitle}> מה המטרה של תרומת טרוביציטים?</div>
        מלבד שם קצת מצחיק, הטרובוציטים הינם חלק משמעותי מתאי הדם המשתמש כמרכיב
        עיקרי במנגנון הקרישה של הדם. תרומה זה משמעותית במיוחד לחולי סרטן וחולים
        נוספים במחלות קשות.
        <div className={styles.subtitle}> למה חשוב לתרום?</div>
        מנת התרומה טובה רק לחמישה ימים ולכן יש צורך בתרומות רבות באופן שוטף.
        <div className={styles.subtitle}>
          במה שונה תרומת תם מתרומת טרומבוציטים?
        </div>
        בתהליך תרומת טרמבוציטים נלקחים מגוף התורם טסיות הדם בלבד. שאר מרכיבי הדם
        מוחזרים לגוף התורם. אין צורך לצום לפני ותהליך ההתאוששות הוא מהיר מאוד.
        <div className={styles.subtitle}>האם יש סכנה בתרומה?</div>
        ממש ממש לא! תהליך התרומה בטוח לחלוטין. הגוף מחזיר לעצמו בתוך כ 24 שעות
        את כמות הטסיות שנתרמה.
        <div className={styles.subtitle}>כמה זמן אורך התהליך?</div>
        התהליך לוקח כשעתיים. מומלץ להביא ספר, נטפליקס או סתם חבר טוב להעביר את
        הזמן.
        <div className={styles.subtitle}>טוב השתכנעתי, מה עכשיו?</div>
        מצויין! פשוט מאוד :
        <ol>
          <li>מבררים את סוג הדם שלכם במוקד מד״א</li>
          <li>נכנסים לאפליקציית המגניבה שלנו ומתאמים תאריך ומקום לתרומה</li>
          <li>מורידים לטלפון כמה פרקים של הסדרה האהובה עליכם</li>
          <li>מגיעים ביום התרומה ועוזרים להציל חיים</li>
        </ol>
      </div>
    </ZMScreen>
  );
}
