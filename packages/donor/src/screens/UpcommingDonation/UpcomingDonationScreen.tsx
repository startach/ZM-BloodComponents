import React, { useState } from "react";
import {
  BookedAppointment,
  DateUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
import styles from "./UpcommingDonationScreen.module.scss";
import Button, { ButtonVariant } from "../../components/basic/Button";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";
import { Color } from "../../constants/colors";
import Illustration from "../../assets/images/upcoming_appointment.svg";
import Cancellation from "../../assets/images/cancelation.svg";
import TrashIcon from "../../assets/icons/trash.svg";

export interface UpcomingDonationScreenProps {
  bookedAppointment: BookedAppointment;
  firstName: string;
  onCancel: () => Promise<void>;
}

export default function UpcomingDonationScreen({
  firstName,
  onCancel,
  bookedAppointment,
}: UpcomingDonationScreenProps) {
  const donationDate = new Date(bookedAppointment.donationStartTimeMillis);
  return (
    <ZMScreen hasBurgerMenu fullWidth>
      <div className={styles.pinkContainer}>
        <div className={styles.welcome}>
          <img
            src={Illustration}
            alt={"illustration"}
            className={styles.illustration}
          />
          <div className={styles.welcomeTitle}>
            <div>איזה כיף!</div>
            <div className={styles.welcomeText}>בקרוב נפגשים</div>
          </div>
        </div>

        <div className={styles.appointmentDetails}>
          <div className={styles.card}>
            <div className={styles.detailsTitle}>
              פרטי התור הקרוב
              <CancelButton onCancel={onCancel} />
            </div>

            <div className={styles.detailsText}>
              <div className={styles.detailLabel}>איפה?</div>
              <div className={styles.detailValue}>
                בית החולים
                {" " + LocaleUtils.getHospitalName(bookedAppointment.hospital)}
              </div>

              <div className={styles.detailLabel}>מתי?</div>
              <div className={styles.detailValue}>
                {DateUtils.ToWeekDayString(donationDate)},{" "}
                {DateUtils.ToDateString(donationDate) + " בשעה "}
                {DateUtils.ToTimeString(donationDate)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.moreInfo}>
        <div className={styles.moreInfoTitle}>טיפים ומידע נוסף</div>
        <li>משך התרומה - בין שעה וחצי לשעתיים.</li>
        <li>יש להביא תעודת זהות.</li>
        <li>יש לשתות מים ולאכול פירות לפני התרומה.</li>
      </div>
    </ZMScreen>
  );
}

function CancelButton(props: { onCancel: () => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onCancel = async () => {
    setIsLoading(true);
    await props.onCancel();
  };

  return (
    <>
      <div className={styles.cancelButton} onClick={handleClickOpen}>
        <Button
          title="ביטול תור"
          onClick={handleClickOpen}
          variant={ButtonVariant.text}
          color={Color.Default}
          isLoading={isLoading}
          className={styles.cancelButtonColor}
        />
        <img src={TrashIcon} alt={"Cancel"} className={styles.cancelIcon} />
      </div>
      <Popup
        open={open}
        title="רק מוודאים"
        content="בטוח/ה שברצונך לבטל את התור?"
        buttonApproveText="כן, בטלו לי את התור"
        goBackText="אל תבטלו לי את התור"
        onBack={handleClose}
        onApproved={onCancel}
        image={Cancellation}
        buttonColor={Color.Secondary}
      />
    </>
  );
}
