import styles from "./DonationInfo.module.scss";
import Calendar from "../../assets/images/AppointmentCalendar.svg";
import { DateUtils, Hospital, LocaleUtils } from "@zm-blood-components/common";

export interface DonationInfoProps {
  donationStartTimeMillis: number;
  hospital: Hospital;
  isExistingAppointment: boolean;
}

export default function DonationInfo({
  donationStartTimeMillis,
  hospital,
  isExistingAppointment,
}: DonationInfoProps) {
  const donationDate = new Date(donationStartTimeMillis);

  return (
    <div className={styles.donationInfo}>
      <img src={Calendar} alt={"Appointment"} className={styles.illustration} />
      <div className={styles.donationInfoText}>
        <div className={styles.infoTitle}>
          פרטי התור {isExistingAppointment ? "הקיים" : "הנבחר"}
        </div>
        <div className={styles.appointmentDetails}>
          {donationDate.toLocaleDateString("he-He", DateUtils.ShortDateFormat)},{" "}
          {LocaleUtils.getHospitalName(hospital)}
        </div>
      </div>
    </div>
  );
}
