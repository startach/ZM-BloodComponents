import styles from "./DonationApproveScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import AllLogos from "./../../assets/images/all logos.svg";
import { Hospital, LocaleUtils } from "@zm-blood-components/common";
import Button, { ButtonVariant } from "../../components/basic/Button";

export interface DonationApproveScreenProps {
  firstName?: string;
  hospital: Hospital;
  donationStartTimeMillis: number;
  onShowOptionSelected: (isNoshow: boolean) => void;
}

export default function DonationApproveScreen({
  firstName,
  hospital,
  donationStartTimeMillis,
  onShowOptionSelected,
}: DonationApproveScreenProps) {
  const date : Date = new Date(donationStartTimeMillis);

  return (
    <ZMScreen title="אישור הגעה">
      <div className={styles.textContainer}>
        <div className={styles.title}>היי {firstName ? firstName : ""}</div>
        <br />
        רצינו לוודא האם הגעת לתרום ב
        {LocaleUtils.getHospitalName(hospital)}
        {" "}
        ב-
        {date.getDate()}.{date.getMonth() + 1}
        {" "}
        בשעה
        {" "}
        {date.getHours()}:{date.getMinutes()}
        ?
        <br />
        <br />
        <div className={styles.buttonContainer}>
          <Button 
            className={styles.textButton}
            onClick={() => onShowOptionSelected(true)}
            title="כן"
            variant={ButtonVariant.outlined}
          />
          <Button 
            className={styles.textButton}
            onClick={() => onShowOptionSelected(false)}
            title="לא"
            variant={ButtonVariant.outlined}
          />
        </div>
        <br /> <br />
        <div className={styles.imageContainer}>
          <img src={AllLogos} alt={"logo"} className={styles.image} />
        </div>
      </div>
    </ZMScreen>
  );
}
