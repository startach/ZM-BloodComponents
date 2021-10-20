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
  const date: Date = new Date(donationStartTimeMillis);

  return (
    <ZMScreen title="אישור הגעה" hasBurgerMenu={true}>
      <div className={styles.textContainer}>
        <div className={styles.title}>היי {firstName ? firstName : ""}</div>
        
        <br />
        {`רצינו לוודא האם הגעת לתרום ב${LocaleUtils.getHospitalName(hospital)}\
         ב-${date.getDate()}.${
          date.getMonth() + 1
        } בשעה ${date.getHours() === 0? "00" : date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}?`}
        <br />
        <br />
        <div className={styles.buttonContainer}>
          <div className={styles.textButton}>
            <Button
              onClick={() => onShowOptionSelected(false)}
              title="כן"
              variant={ButtonVariant.outlined}
            />
          </div>
          <div className={styles.textButton}>
            <Button
              onClick={() => onShowOptionSelected(true)}
              title="לא"
              variant={ButtonVariant.outlined}
            />
          </div>
        </div>
        <br /> <br />
        <div className={styles.imageContainer}>
          <img src={AllLogos} alt={"logo"} className={styles.image} />
        </div>
      </div>
    </ZMScreen>
  );
}
