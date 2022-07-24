import styles from "./DonationInfo.module.scss";
import Calendar from "../../assets/images/AppointmentCalendar.svg";
import { DateUtils, Hospital, LocaleUtils } from "@zm-blood-components/common";

export interface DonationToBookInfoProps {
  donationStartTimeMillis: number;
  hospital: Hospital;
  isPreviousAppointmentInfo: boolean;
}

export default function DonationToBookInfo({
  donationStartTimeMillis,
  hospital,
  isPreviousAppointmentInfo,
}: DonationToBookInfoProps) {
  const donationDate = new Date(donationStartTimeMillis);

  return (
    <div className={styles.donationInfo}>
      <img src={Calendar} alt={"Appointment"} className={styles.illustration} />
      <div className={styles.donationInfoText}>
        <div className={styles.infoTitle}>
          פרטי התור {isPreviousAppointmentInfo ? "הקיים" : "הנבחר"}
        </div>
        <div className={styles.appointmentDetails}>
          {donationDate.toLocaleDateString("he-He", DateUtils.ShortDateFormat)},{" "}
          {LocaleUtils.getHospitalName(hospital)}
        </div>
      </div>
    </div>
  );
}
