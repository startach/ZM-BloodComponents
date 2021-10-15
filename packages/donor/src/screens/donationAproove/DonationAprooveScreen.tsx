import styles from "./DonationAprooveScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen/ZMScreen";
import AllLogos from "./../../assets/images/all logos.svg";
import { AvailableAppointment } from "common/src/types";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export interface DonationAprroveScreenProps {
  firstName: string;
  apointmentNotAprooved: AvailableAppointment;
}

export default function DonationAprooveScreen({
  firstName,
  apointmentNotAprooved,
} : DonationAprroveScreenProps) {
  return (
    <ZMScreen title="אישור הגעה">
      <div className={styles.textContainer}>
        <div className={styles.title}>היי {firstName? firstName : ""}</div>
        <br />
        רצינו לוודא האם הגעת לתרום?
        <br/><br/>
        
        {apointmentNotAprooved? apointmentNotAprooved : ""}

        <div className={styles.buttonContainer}>
          <div 
            className={styles.textButton}
            onClick= { () => FirebaseFunctions.completeAppointment(apointmentNotAprooved.id)}
          >
            כן
          </div>

          <div 
            className={styles.textButton}
            onClick= { () => FirebaseFunctions.completeAppointment(apointmentNotAprooved.id)}
          >
            לא
          </div>
        </div>

        <br/> <br/>
        <div className={styles.imageContainer}>
          <img src={AllLogos} alt={"logo"} className={styles.image} />
        </div>
      </div>
    </ZMScreen>
  );
}