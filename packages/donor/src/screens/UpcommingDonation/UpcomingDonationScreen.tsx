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
import Illustration from "../../assets/images/home page-illustration.png";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

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
    <ZMScreen title="פרטי תור עתידי" hasBurgerMenu fullWidth>
      <div className={styles.welcome}>
        <img
          src={Illustration}
          alt={"illustration"}
          className={styles.illustration}
        />
        <div className={styles.welcomeTitle}>איזה כיף</div>
        <div className={styles.welcomeText}>בקרוב נפגשים</div>
      </div>

      <div className={styles.appointmentDetails}>
        <div className={styles.card}>
          <div className={styles.detailsTitle}>
            פרטי התור הקרוב
            <CancelButton onCancel={onCancel} />
          </div>

          <div className={styles.detailsText}>
            <div className={styles.detailLabel}>איפה</div>
            <div className={styles.detailValue}>
              בית החולים
              {" " + LocaleUtils.getHospitalName(bookedAppointment.hospital)}
            </div>

            <div className={styles.detailLabel}>מתי</div>
            <div className={styles.detailValue}>
              {DateUtils.ToWeekDayString(donationDate)},{" "}
              {DateUtils.ToDateString(donationDate) + " בשעה "}
              {DateUtils.ToTimeString(donationDate)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.moreInfo}>
        <div className={styles.moreInfoTitle}>טיפים ומידע נוסף</div>
        <li>משך התרומה היא בין שעה וחצי לשעתיים.</li>
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
        />
        <DeleteOutlineOutlinedIcon color={"secondary"} />
      </div>
      <Popup
        buttonApproveText="אישור"
        open={open}
        title="רק מוודאים"
        content="האם את/ה בטוח/ה שברצונך לבטל את התור?"
        goBackText="בעצם לא"
        onBack={handleClose}
        onApproved={onCancel}
      />
    </>
  );
}
