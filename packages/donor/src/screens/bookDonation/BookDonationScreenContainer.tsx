import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import { AppStateType } from "../../navigation/AppRouter";
import BookDonationScreen from "./BookDonationScreen";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";

interface BookDonationScreenContainerProps {
  isLoggedIn: boolean;
  appState: AppStateType;
}

export function BookDonationScreenContainer({
  appState,
  isLoggedIn,
}: BookDonationScreenContainerProps) {
  const navigate = useNavigate();
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (appState.bookedAppointment) {
    return <Navigate to={MainNavigationKeys.UpcomingDonation} />;
  }
  if (appState.pendingCompletionAppointments.length !== 0) {
    return <Navigate to={MainNavigationKeys.Approve} />;
  }

  if (
    isLoggedIn &&
    appointmentToBookStore.hasAppointmentToBook() &&
    !appointmentToBookStore.isAppointmentTooCloseToLastDonation(appState.donor!)
  ) {
    return <Navigate to={MainNavigationKeys.Questionnaire} />;
  }

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    appointmentToBookStore.setAppointmentToBook(donationSlot);

    if (isLoggedIn) {
      appointmentToBookStore.isAppointmentTooCloseToLastDonation(appState.donor!)
        ? setShowWarningPopup(true)
        :  navigate(MainNavigationKeys.Questionnaire);
    } else {
      navigate(MainNavigationKeys.Register);
    }
  };

  const onSlotSelectedPopUpProps = {
    open: showWarningPopup,
    onApproved: () => navigate(MainNavigationKeys.Questionnaire),
    onBack: () => {
      setShowWarningPopup(false);
      navigate(MainNavigationKeys.BookDonation);
    },
    onBClose: () => {
      setShowWarningPopup(false);
      navigate(MainNavigationKeys.BookDonation);
    },
  };

  return (
    <BookDonationScreen
      availableAppointments={availableAppointmentsStore.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={appState.donor?.firstName}
      isFetching={availableAppointmentsStore.isFetching}
      defaultHospital={""}
      tooCloseDonationPopupProps={onSlotSelectedPopUpProps}
    />
  );
}

export default observer(BookDonationScreenContainer);
