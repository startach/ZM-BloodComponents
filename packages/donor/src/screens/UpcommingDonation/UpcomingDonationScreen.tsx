import React, { useState } from "react";
import {
  BookedAppointment,
  DateUtils,
  Hospital,
  LinkUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
import styles from "./UpcomingDonationScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";
import { Color } from "../../constants/colors";
import Illustration from "../../assets/images/exists appointment.svg";
import Cancellation from "../../assets/images/same-day-donation.svg";
import SameDayDonation from "../../assets/images/same-day-donation.svg";
import Whatsapp from "../../assets/images/whatsup-color-big.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import UpcomingDonationInfo from "./UpcomingDonationInfo";
import EventCalendarLink from "./EventCalendarLink";

const EVENT_DURATION_BY_MINUTES = 90;

export interface UpcomingDonationScreenProps {
  bookedAppointment: BookedAppointment;
  fullName: string;
  onCancel: () => Promise<void>;
  showSameDayDonationPopup: boolean;
}

export default function UpcomingDonationScreen({
  fullName,
  onCancel,
  bookedAppointment,
  showSameDayDonationPopup,
}: UpcomingDonationScreenProps) {
  const [showPopup, setShowPopup] = useState(showSameDayDonationPopup);
  const phoneNumber = getHospitalPhoneNumber(bookedAppointment.hospital);

  return (
    <ZMScreen hasBurgerMenu>
      <div className={styles.pinkContainer}>
        <div className={styles.welcome}>
          <img
            src={Illustration}
            alt={"illustration"}
            className={styles.illustration}
          />
          <div className={styles.welcomeTitle}>
            <div>היי</div>
            <div>{fullName},</div>
            <div className={styles.welcomeText}>בקרוב נפגש</div>
          </div>
        </div>

        <div className={styles.appointmentDetails}>
          <div className={styles.card}>
            <div className={styles.detailsTitleContainer}>
              <div className={styles.detailsTitle}>פרטי התור שלך:</div>
              <CancelButton onCancel={onCancel} />
            </div>

            <div className={styles.detailsText}>
              <div className={styles.detailLabel}>איפה?</div>
              <div className={styles.detailValue}>
                בית החולים
                {" " + LocaleUtils.getHospitalName(bookedAppointment.hospital)}
              </div>
              <NeedRideButton hospital={bookedAppointment.hospital} />

              <div className={styles.detailLabel}>מתי?</div>
              <div className={styles.detailValue}>
                {new Date(
                  bookedAppointment.donationStartTimeMillis
                ).toLocaleDateString("he-He", DateUtils.ShortDateFormat)}
              </div>
              <EventCalendarLink
                bookedAppointment={bookedAppointment}
                eventDurationByMinutes={EVENT_DURATION_BY_MINUTES}
              />
            </div>
          </div>
        </div>
      </div>

      <UpcomingDonationInfo hospital={bookedAppointment.hospital} />

      <Popup
        open={showPopup}
        title={"איזו ספונטיות!"}
        buttonApproveText={"אישור"}
        onApproved={() => setShowPopup(false)}
        image={SameDayDonation}
      >
        <div className={styles.popupContent}>
          נרשמת לתור שמתקיים היום. כדאי מאוד להתקשר למאמת כדי לוודא קיום התור
          בטלפון
          <a href={"tel:" + phoneNumber} className={styles.popupPhoneNumber}>
            {phoneNumber}
          </a>
        </div>
      </Popup>
    </ZMScreen>
  );
}

function NeedRideButton(props: { hospital: Hospital }) {
  const [open, setOpen] = React.useState(false);

  let content = "";
  switch (props.hospital) {
    case Hospital.BEILINSON:
      content =
        "כדי לתאם הסעה ניתן להתקשר למיכל, מתאמת התרומות בבילינסון, בטלפון 03−9376052, או לשלוח הודעה בוואטסאפ לרכז שלך עם מיקום וזמני האיסוף";
      break;

    default:
      content =
        "ניתן לתאם הסעה על ידי שליחת הודעת וואטסאפ לרכז שלך עם עם מיקום וזמני האיסוף";
  }

  return (
    <>
      <div className={styles.link} onClick={() => setOpen(true)}>
        אני צריכ/ה הסעה
      </div>
      <Popup
        open={open}
        title="אין לך איך להגיע?"
        buttonApproveText="בקשת הסעה"
        goBackText="בעצם לא צריך"
        onBack={() => setOpen(false)}
        onApproved={() => {
          window.open(
            LinkUtils.getWhatsAppLinkWithText(
              `אהלן, נרשמתי לתרום טרומבוציטים ב${LocaleUtils.getHospitalName(
                props.hospital
              )} ואצטרך הסעה`
            )
          );
        }}
        image={Whatsapp}
        buttonColor={Color.Primary}
      >
        {content}
      </Popup>
    </>
  );
}

function CancelButton(props: { onCancel: () => Promise<void> }) {
  const [open, setOpen] = React.useState(false);

  const onCancelAppointment = async () => {
    await props.onCancel();
  };

  return (
    <>
      <div className={styles.cancelButton} onClick={() => setOpen(true)}>
        ביטול תור
        <img src={TrashIcon} alt={"Cancel"} className={styles.cancelIcon} />
      </div>
      <Popup
        open={open}
        title="רק מוודאים"
        buttonApproveText="כן, בטלו לי את התור"
        goBackText="אל תבטלו לי את התור"
        onBack={() => setOpen(false)}
        onApproved={onCancelAppointment}
        image={Cancellation}
        buttonColor={Color.Secondary}
      >
        בטוח/ה שברצונך לבטל את התור?
      </Popup>
    </>
  );
}

function getHospitalPhoneNumber(hospital: Hospital) {
  switch (hospital) {
    case Hospital.TEL_HASHOMER:
      return "03-5305375";
    case Hospital.BEILINSON:
      return "03-9376052";
    case Hospital.SOROKA:
      return "08-6400138";
    case Hospital.ASAF_HAROFE:
    case Hospital.HADASA_EIN_KEREM:
    case Hospital.ICHILOV:
    case Hospital.RAMBAM:
    default:
      return "058-7100571";
  }
}
