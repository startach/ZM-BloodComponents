import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import { AppStateType } from "../../navigation/AppRouter";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";
import SwapDonationScreen from "./SwapDonationScreen";

interface SwapDonationScreenContainerProps {
  isLoggedIn: boolean;
  appState: AppStateType;
}

export function SwapDonationScreenContainer({
  appState,
  isLoggedIn,
}: SwapDonationScreenContainerProps) {
  const navigate = useNavigate();
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (!isLoggedIn || !appState.bookedAppointment) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    appointmentToBookStore.setAppointmentToBook(donationSlot);

    if (isLoggedIn) {
      appointmentToBookStore.isAppointmentTooCloseToLastDonation(
        appState.donor!
      )
        ? setShowWarningPopup(true)
        : navigate(MainNavigationKeys.Questionnaire);
      console.log(
        appointmentToBookStore.isAppointmentTooCloseToLastDonation(
          appState.donor!
        )
      );
    } else {
      navigate(MainNavigationKeys.Register);
    }
  };

  const onSlotSelectedPopUpProps = {
    open: showWarningPopup,
    onApproved: () => navigate(MainNavigationKeys.Questionnaire),
    onBack: () => {
      setShowWarningPopup(false);
      navigate(MainNavigationKeys.SwapDonation);
    },
    onClose: () => {
      setShowWarningPopup(false);
      navigate(MainNavigationKeys.SwapDonation);
    },
  };

  return (
    <SwapDonationScreen
      availableAppointments={availableAppointmentsStore.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={appState.donor?.firstName}
      isFetching={availableAppointmentsStore.isFetching}
      tooCloseDonationPopupProps={onSlotSelectedPopUpProps}
    />
  );
}

export default observer(SwapDonationScreenContainer);
