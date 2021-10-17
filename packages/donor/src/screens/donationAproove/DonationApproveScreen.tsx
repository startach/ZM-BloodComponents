import styles from "./DonationApproveScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import AllLogos from "./../../assets/images/all logos.svg";
import { AvailableAppointment } from "common/src/types";

export interface DonationApproveScreenProps {
  firstName?: string;
  apointmentNotAprooved?: AvailableAppointment;
  onShowOptionSelected: (isNoshow: boolean) => void;
}

export default function DonationApproveScreen({
  firstName,
  apointmentNotAprooved,
  onShowOptionSelected,
}: DonationApproveScreenProps) {
  return (
    <ZMScreen title="אישור הגעה">
      <div className={styles.textContainer}>
        <div className={styles.title}>היי {firstName ? firstName : ""}</div>
        <br />
        רצינו לוודא האם הגעת לתרום?
        <br />
        <br />
        {apointmentNotAprooved ? apointmentNotAprooved : ""}
        <div className={styles.buttonContainer}>
          <div
            className={styles.textButton}
            onClick={() => onShowOptionSelected(false)}
          >
            כן
          </div>
          <div
            className={styles.textButton}
            onClick={() => onShowOptionSelected(true)}
          >
            לא
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
