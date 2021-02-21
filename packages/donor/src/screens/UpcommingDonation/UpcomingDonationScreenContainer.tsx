import React from "react";
import { BookedAppointment, Donor } from "@zm-blood-components/common";
import UpcomingDonationScreen, {
  UpcomingDonationStates,
} from "./UpcomingDonationScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

interface UpcomingDonationScreenContainerProps {
  user: Donor;
  bookedAppointment: BookedAppointment;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export default function UpcomingDonationScreenContainer(
  props: UpcomingDonationScreenContainerProps
) {
  const onCancelAppointment = async () => {
    await FirebaseFunctions.cancelAppointment(props.bookedAppointment.id);
    props.setBookedAppointment(undefined);
  };

  return (
    <UpcomingDonationScreen
      state={UpcomingDonationStates.beforeDonation}
      lastDonation={new Date(2021, 0, 13)}
      bookedAppointment={props.bookedAppointment}
      firstName={props.user.firstName}
      onCancel={onCancelAppointment}
      onConfirm={() => {
        console.log("donation confirmed");
      }}
    />
  );
}
