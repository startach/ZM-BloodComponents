import DonationApproveScreen from "./DonationApproveScreen";
import { BookedAppointment } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export interface DonationApproveScreenContainerProps {
  firstName: string;
  pendingCompletionAppointments: BookedAppointment;
  poppendingCompletionAppointments: () => void;
  setIsFetching: (isFetching: boolean) => void;
}

export default function DonationApproveScreenContainer({
  firstName,
  pendingCompletionAppointments,
  poppendingCompletionAppointments,
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

    // update appState (remove the approved appointment from the pendingCompletionAppointments array)
    poppendingCompletionAppointments();
  };

  return (
    <DonationApproveScreen
      firstName={firstName}
      hospital={pendingCompletionAppointments.hospital}
      donationStartTimeMillis={
        pendingCompletionAppointments.donationStartTimeMillis
      }
      appointmentId={pendingCompletionAppointments.id}
      onShowOptionSelected={onShowOptionSelected}
    />
  );
}
