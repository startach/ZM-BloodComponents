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
import Whatsapp from "../../assets/images/whatsup-color-big.svg";
import UpcomingDonationInfo from "./UpcomingDonationInfo";
import EventCalendarLink from "./EventCalendarLink";
import AnchorTag from "../../components/basic/AnchorTag";
import Menu, { MenuItem } from "../../components/basic/Menu/Menu";
import IconButton from "../../components/basic/IconButton";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import TrashIcon from "../../assets/icons/trash.svg";
import SwapIcon from "../../assets/icons/swap_icon.svg";
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
  const navigate = useNavigate();
  const [menuAnchorElement, setMenuAnchorElement] =
    React.useState<null | HTMLElement>(null);
  const [showCancelAppointmentPopup, setShowCancelAppointmentPopup] =
    React.useState(false);
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
            <div className={styles.welcomeText}>בקרוב ניפגש</div>
          </div>
        </div>

        <div className={styles.appointmentDetails}>
          <div className={styles.card}>
            <div className={styles.detailsTitleContainer}>
              <div className={styles.detailsTitle}>פרטי התור שלך:</div>
              <IconButton
                buttonName="open_change_booked_appointment"
                onClick={(e) => setMenuAnchorElement(e.currentTarget)}
              >
                <Typography variant="subtitle2">פעולות נוספות</Typography>
                <KeyboardArrowDown />
              </IconButton>
              <Menu
                analyticsName={"change_booked_appointment"}
                anchorEl={menuAnchorElement}
                open={!!menuAnchorElement}
                onClose={() => setMenuAnchorElement(null)}
              >
                <MenuItem
                  analyticsValue="cancel_appointment"
                  onClick={() => setShowCancelAppointmentPopup(true)}
                >
                  <img src={TrashIcon} alt={"Cancel"} className={styles.icon} />
                  <Typography variant="body2">ביטול תור</Typography>
                </MenuItem>
                <MenuItem
                  analyticsValue="cancel_appointment"
                  className={styles.cancelAppointment}
                  onClick={() => navigate(MainNavigationKeys.SwapDonation)}
                >
                  <img src={SwapIcon} alt={"Swap"} className={styles.icon} />
                  <Typography variant="body2">החלפת תור</Typography>
                </MenuItem>
              </Menu>
              <Popup
                name="cancel_appointment"
                open={showCancelAppointmentPopup}
                title="רק מוודאים"
                buttonApproveText="כן, בטלו לי את התור"
                goBackText="אל תבטלו לי את התור"
                onBack={() => setShowCancelAppointmentPopup(false)}
                onApproved={async () => await onCancel()}
                image={Cancellation}
                buttonColor={Color.Secondary}
              >
                בטוח/ה שברצונך לבטל את התור?
              </Popup>
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
        name="spontaneous_booking"
        open={showPopup}
        title={"איזו ספונטיות!"}
        buttonApproveText={"הבנתי"}
        onApproved={() => setShowPopup(false)}
        image={Cancellation}
      >
        <div className={styles.popupContent}>
          נרשמת לתור שמתקיים היום! כדאי מאוד להתקשר למתאמ/ת כדי לוודא את קיום
          התור בטלפון
          <AnchorTag
            linkName="coordinator_phone"
            href={"tel:" + phoneNumber}
            className={styles.popupPhoneNumber}
          >
            {phoneNumber}
          </AnchorTag>
        </div>
      </Popup>
    </ZMScreen>
  );
}

function NeedRideButton(props: { hospital: Hospital }) {
  const [open, setOpen] = React.useState(false);

  let buttonApproveText = "";
  let content = "";
  let onApprovedContent = "";
  switch (props.hospital) {
    case Hospital.BEILINSON:
      content = "כדי לתאם הסעה ניתן להתקשר למיכל, מתאמת התרומות בבילינסון";
      buttonApproveText = "התקשר למתאמת התרומות";
      onApprovedContent = LinkUtils.getPhoneCall("03-9376052");
      break;

    default:
      content =
        "ניתן לתאם הסעה על ידי שליחת הודעת וואטסאפ לרכז שלך עם עם מיקום וזמני האיסוף";
      buttonApproveText = "בקשת הסעה";
      onApprovedContent = LinkUtils.getWhatsAppLinkWithText(
        `אהלן, נרשמתי לתרום טרומבוציטים ב${LocaleUtils.getHospitalName(
          props.hospital
        )} ואצטרך הסעה`
      );
  }

  return (
    <>
      <div className={styles.link} onClick={() => setOpen(true)}>
        אני צריכ/ה הסעה
      </div>
      <Popup
        name="ask_for_a_ride"
        open={open}
        title="אין לך איך להגיע?"
        buttonApproveText={buttonApproveText}
        goBackText="בעצם לא צריך"
        onBack={() => setOpen(false)}
        onApproved={() => {
          window.open(onApprovedContent);
        }}
        image={Whatsapp}
        buttonColor={Color.Primary}
      >
        {content}
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
