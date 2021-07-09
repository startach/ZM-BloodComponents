import styles from "./DonationToBookInfo.module.scss";
import Calendar from "../../assets/images/AppointmentCalendar.svg";
import { DateUtils, Hospital, LocaleUtils } from "@zm-blood-components/common";
import React from "react";

export interface DonationToBookInfoProps {
  donationStartTimeMillis: number;
  hospital: Hospital;
}

export default function DonationToBookInfo({
  donationStartTimeMillis,
  hospital,
}: DonationToBookInfoProps) {
  const donationDate = new Date(donationStartTimeMillis);

  return (
    <div className={styles.donationInfo}>
      <img src={Calendar} alt={"Appointment"} className={styles.illustration} />
      <div className={styles.donationInfoText}>
        <div className={styles.infoTitle}>פרטי התור הנבחר</div>
        <div className={styles.appointmentDetails}>
          {donationDate.toLocaleDateString("he-He", DateUtils.ShortDateFormat)},{" "}
          {LocaleUtils.getHospitalName(hospital)}
        </div>
      </div>
    </div>
  );
}
