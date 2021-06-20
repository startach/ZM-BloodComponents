import { BloodType } from "@zm-blood-components/common";
import Button, { ButtonVariant } from "../../components/basic/Button";
import styles from "./ExtendedSignupScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen";
import PersonalDetails from "./PersonalDetails";

export interface ExtendedSignupScreenProps {
  onSave: (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType
  ) => void;
  onSignOut: () => void;
}

export default function ExtendedSignupScreen(props: ExtendedSignupScreenProps) {
  return (
    <ZMScreen title={"סיום הרשמה"} className={styles.extendedSignup}>
      <div className={styles.infoText}>
        תודה שבחרת להירשם כתורמ/ת. רגע לפני שתוכל/י לקבוע תור לתרומה ולהציל
        חיים,
        <div className={styles.infoTextBold}>אנחנו צריכים כמה פרטים עליך:</div>
      </div>

      <PersonalDetails buttonText={"רשמו אותי"} onSave={props.onSave} />

      <div className={styles.signOut}>
        <Button
          onClick={props.onSignOut}
          title={"התנתק"}
          variant={ButtonVariant.text}
        />
      </div>
    </ZMScreen>
  );
}
