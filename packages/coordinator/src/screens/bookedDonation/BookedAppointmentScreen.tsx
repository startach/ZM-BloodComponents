import React from "react";
import {
  BookedDonationWithDonorDetails,
  DateUtils,
} from "@zm-blood-components/common";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import Spinner from "../../components/Spinner";

export type BookedAppointmentScreenProps = {
  appointment?: BookedDonationWithDonorDetails;
  onRemoveDonor: () => void;
  onCopyAppointmentDetails: () => void;
};

export default function BookedAppointmentScreen(
  props: BookedAppointmentScreenProps
) {
  if (!props.appointment) {
    return <Spinner />;
  }

  const time = DateUtils.ToDateString(
    props.appointment.donationStartTimeMillis
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
      {JSON.stringify(props)}
    </CoordinatorScreen>
  );
}
