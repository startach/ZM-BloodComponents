import DonationApproveScreen from "./DonationApproveScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { AppStateType } from "../../navigation/AppRouter";
import { Navigate } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

export interface DonationApproveScreenContainerProps {
  loggedIn: boolean;
  appState: AppStateType;
  popPendingCompletionAppointment: () => void;
  setIsFetching: (isFetching: boolean) => void;
}

export default function DonationApproveScreenContainer({
  loggedIn,
  appState,
  popPendingCompletionAppointment,
  setIsFetching,
}: DonationApproveScreenContainerProps) {
  if (
    !loggedIn ||
    !appState.donor ||
    appState.pendingCompletionAppointments.length === 0
  ) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }

  const pendingCompletionAppointment =
    appState.pendingCompletionAppointments[0];

  const onShowOptionSelected = async (isNoShow: boolean) => {
    // show loading page
    setIsFetching(true);

    // wait for return from cloud function
    await FirebaseFunctions.setCompleteAppointment(
      pendingCompletionAppointment.id,
      isNoShow
    );

    // update appState (remove the approved appointment from the pendingCompletionAppointment array)
    popPendingCompletionAppointment();
  };

  return (
    <DonationApproveScreen
      firstName={appState.donor!.firstName}
      hospital={pendingCompletionAppointment.hospital}
      donationStartTimeMillis={
        pendingCompletionAppointment.donationStartTimeMillis
      }
      onShowOptionSelected={onShowOptionSelected}
    />
  );
}
