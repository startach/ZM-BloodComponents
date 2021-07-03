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
import Whatsapp from "../../assets/images/whatsup-color-big.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { WHATSAPP_LINK } from "../contact/ContactScreen";

export interface UpcomingDonationScreenProps {
  bookedAppointment: BookedAppointment;
  fullName: string;
  onCancel: () => Promise<void>;
}

export default function UpcomingDonationScreen({
  fullName,
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
            <div>{fullName},</div>
            <div className={styles.welcomeText}>בקרוב נפגש</div>
          </div>
        </div>

        <div className={styles.appointmentDetails}>
          <div className={styles.card}>
            <div className={styles.detailsTitleContainer}>
              <div className={styles.detailsTitle}>פרטי התור שלך</div>
              <CancelButton onCancel={onCancel} />
            </div>

            <div className={styles.detailsText}>
              <div className={styles.detailLabel}>איפה?</div>
              <div className={styles.detailValue}>
                בית החולים
                {" " + LocaleUtils.getHospitalName(bookedAppointment.hospital)}
              </div>
              <NeedRideButton />

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

function NeedRideButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={styles.link} onClick={() => setOpen(true)}>
        אני צריכ/ה הסעה
      </div>
      <Popup
        open={open}
        title="אין לך איך להגיע?"
        content="ניתן לתאם הסעה על ידי שליחת הודעת וואטסאפ לרכז שלך עם עם מיקום וזמני האיסוף"
        buttonApproveText="בקשת הסעה"
        goBackText="בעצם לא צריך"
        onBack={() => setOpen(false)}
        onApproved={() => {
          window.open(WHATSAPP_LINK);
        }}
        image={Whatsapp}
        buttonColor={Color.Primary}
      />
    </>
  );
}

function CancelButton(props: { onCancel: () => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const onCancelAppointment = async () => {
    setIsLoading(true);
    await props.onCancel();
  };

  return (
    <>
      <div className={styles.cancelButton}>
        <Button
          title="ביטול תור"
          onClick={() => setOpen(true)}
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
        onBack={() => setOpen(false)}
        onApproved={onCancelAppointment}
        image={Cancellation}
        buttonColor={Color.Secondary}
      />
    </>
  );
}
