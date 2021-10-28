import DonationApproveScreen from "./DonationApproveScreen";
import { BookedAppointment } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export interface DonationApproveScreenContainerProps {
  firstName: string;
  pendingCompletionAppointment: BookedAppointment;
  poppendingCompletionAppointment: () => void;
  setIsFetching: (isFetching: boolean) => void;
}

export default function DonationApproveScreenContainer({
  firstName,
  pendingCompletionAppointment,
  poppendingCompletionAppointment,
  setIsFetching,
}: DonationApproveScreenContainerProps) {
  const onShowOptionSelected = async (isNoShow: boolean) => {
    // show loading page
    setIsFetching(true);

    // wait for return from cloud functin
    await FirebaseFunctions.setCompleteAppointment(
      pendingCompletionAppointment.id,
      isNoShow
    );

    // update appState (remove the approved appointment from the pendingCompletionAppointment array)
    poppendingCompletionAppointment();
  };

  return (
    <DonationApproveScreen
      firstName={firstName}
      hospital={pendingCompletionAppointment.hospital}
      donationStartTimeMillis={
        pendingCompletionAppointment.donationStartTimeMillis
      }
      onShowOptionSelected={onShowOptionSelected}
    />
  );
}
