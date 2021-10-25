import DonationApproveScreen from "./DonationApproveScreen";
import { BookedAppointment } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export const APPROVE_HISTOEY_LENGTH_DAYS = 30;

export interface DonationApproveScreenContainerProps {
  firstName: string;
  appointmentNotApproved: BookedAppointment;
  popNotApprovedAppointment: () => void;
  setIsFetching: (isFetching: boolean) => void;
}

export default function DonationApproveScreenContainer({
  firstName,
  appointmentNotApproved,
  popNotApprovedAppointment,
  setIsFetching,
}: DonationApproveScreenContainerProps) {
  const onShowOptionSelected = async (
    appointmentId: string,
    isNoShow: boolean
  ) => {
    // show loading page
    setIsFetching(true);

    // wait for return from cloud functin
    await FirebaseFunctions.setCompleteAppointment(appointmentId, isNoShow);

    // update appState (remove the approved appointment from the apointmentNotApproved array)
    popNotApprovedAppointment();
  };

  return (
    <DonationApproveScreen
      firstName={firstName}
      hospital={appointmentNotApproved.hospital}
      donationStartTimeMillis={appointmentNotApproved.donationStartTimeMillis}
      appointmentId={appointmentNotApproved.id}
      onShowOptionSelected={onShowOptionSelected}
    />
  );
}
