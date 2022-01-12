import React from "react";
import {
  BookedDonationWithDonorDetails,
  DateUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import InfoBar from "./InfoBar";
import { ReactComponent as Phone } from "../../assets/icons/phone.svg";
import { ReactComponent as Bloodtype } from "../../assets/icons/bloodtype.svg";
import { ReactComponent as Calender } from "../../assets/icons/calender.svg";
import styles from "./BookedAppointmentScreen.module.scss";

export type BookedAppointmentScreenProps = {
  appointment?: BookedDonationWithDonorDetails;
  onRemoveDonor: () => void;
  onCopyAppointmentDetails: () => void;
};

export default function BookedAppointmentScreen(
  props: BookedAppointmentScreenProps
) {
  if (!props.appointment) {
    // Loading state
    return null;
  }

  const time = DateUtils.ToDateString(
    props.appointment.donationStartTimeMillis
  );
  const bookingTime = DateUtils.ToDateString(
    props.appointment.bookingTimeMillis
  );
  return (
    <CoordinatorScreen
      headerProps={{
        title: time,
        variant: HeaderVariant.INFO,
        hasBackButton: true,
        hasNotificationsIcon: true,
        stickyComponent: <div>{props.appointment.firstName}</div>,
      }}
    >
      <div className={styles.details}>פרטי התורם</div>
      <InfoBar title={"מספר טלפון"} icon={<Phone />}>
        <a href={`tel: ${props.appointment.phone}`}>
          {props.appointment.phone}
        </a>
      </InfoBar>
      <InfoBar title={"סוג דם"} icon={<Bloodtype />}>
        {LocaleUtils.getBloodTypeTranslation(props.appointment.bloodType)}
      </InfoBar>
      <InfoBar title={"נקבע בתאריך"} icon={<Calender />}>
        {bookingTime}
      </InfoBar>
    </CoordinatorScreen>
  );
}
