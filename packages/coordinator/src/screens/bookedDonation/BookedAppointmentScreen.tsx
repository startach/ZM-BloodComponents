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
import { ReactComponent as Copy } from "../../assets/icons/copy.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Calender } from "../../assets/icons/calender.svg";
import styles from "./BookedAppointmentScreen.module.scss";
import AppointmentStatusChip from "../../components/AppointmentStatusChip";
import {
  ToFullDateString,
  ToMonthString,
  ToWeekDayString,
} from "@zm-blood-components/common/src/DateUtils";

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
  const fulltime = new Date(
    props.appointment.donationStartTimeMillis
  ).toLocaleDateString("he-He", DateUtils.LongDateFormat);

  const bookingTime = DateUtils.ToDateString(
    props.appointment.bookingTimeMillis
  );
  return (
    <CoordinatorScreen
      className={styles.bookedApointmentScreenContent}
      headerProps={{
        title: fulltime,
        variant: HeaderVariant.INFO,
        hasBackButton: true,
        hasNotificationsIcon: true,
        stickyComponent: NameBar(props),
      }}
    >
      <div className={styles.status}>
        <div>סטטוס:</div>
        <div className={styles.statusChip}>
          <AppointmentStatusChip
            appointmentStatusType={props.appointment.status}
          />
        </div>
      </div>
      <div className={styles.details}>פרטי תורם</div>
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

function NameBar({ ...props }) {
  return (
    <div className={styles.name}>
      <div>{`${props.appointment.firstName} ${props.appointment.lastName}`}</div>
      <div className={styles.icons}>
        <Copy onClick={props.onCopyAppointmentDetails} />
        <Profile onClick={props.onRemoveDonor} />
      </div>
    </div>
  );
}
