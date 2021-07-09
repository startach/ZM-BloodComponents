import { BloodType, Donor } from "@zm-blood-components/common";
import styles from "./MyProfileScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import PersonalDetails from "../extendedSignup/PersonalDetails";

export interface MyProfileScreenProps {
  user: Donor;
  onSave: (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
  appVersion?: string;
}

export default function MyProfileScreen({
  user,
  onSave,
}: MyProfileScreenProps) {
  return (
    <ZMScreen hasBackButton title="הפרופיל שלי">
      <div className={styles.title}>
        <div>{`${user.firstName} ${user.lastName}`}</div>
      </div>

      <div className={styles.content}>
        <PersonalDetails
          firstName={user.firstName}
          lastName={user.lastName}
          phone={user.phone}
          bloodType={user.bloodType}
          buttonText={"עדכון פרטים"}
          onSave={onSave}
        />
      </div>
    </ZMScreen>
  );
}
