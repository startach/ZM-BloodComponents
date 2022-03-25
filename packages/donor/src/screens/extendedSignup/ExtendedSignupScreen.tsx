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
    bloodType: BloodType,
    enableEmailNotifications: boolean
  ) => void;
  onSignOut: () => void;
}

export default function ExtendedSignupScreen(props: ExtendedSignupScreenProps) {
  return (
    <ZMScreen title={"סיום הרשמה"} padding>
      <div className={styles.infoText}>
        תודה שבחרת להירשם כתורמ/ת. רגע לפני שתוכל/י לקבוע תור לתרומה ולהציל
        חיים,
        <div className={styles.infoTextBold}>אנחנו צריכים כמה פרטים עליך:</div>
      </div>

      <PersonalDetails
        buttonText={"רשמו אותי"}
        onSave={props.onSave}
        showNotificationToggle={false}
      />

      <div className={styles.signOut}>
        <Button
          buttonName="sign_out"
          onClick={props.onSignOut}
          title={"התנתקות"}
          variant={ButtonVariant.text}
        />
      </div>
    </ZMScreen>
  );
}
