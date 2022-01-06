import BookDonationScreen from "./BookDonationScreen";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { observer } from "mobx-react-lite";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";
import { Navigate, useNavigate } from "react-router-dom";
import { AppStateType } from "../../navigation/AppRouter";

interface BookDonationScreenContainerProps {
  isLoggedIn: boolean;
  appState: AppStateType;
}

export function BookDonationScreenContainer({
  appState,
  isLoggedIn,
}: BookDonationScreenContainerProps) {
  const navigate = useNavigate();
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (appState.bookedAppointment) {
    return <Navigate to={MainNavigationKeys.UpcomingDonation} />;
  }
  if (appState.pendingCompletionAppointments.length !== 0) {
    return <Navigate to={MainNavigationKeys.Approve} />;
  }

  if (isLoggedIn && appointmentToBookStore.hasAppointmentToBook()) {
    return <Navigate to={MainNavigationKeys.Questionnaire} />;
  }

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    appointmentToBookStore.setAppointmentToBook(donationSlot);
    if (isLoggedIn) {
      navigate(MainNavigationKeys.Questionnaire);
    } else {
      navigate(MainNavigationKeys.Register);
    }
  };

  return (
    <BookDonationScreen
      availableAppointments={availableAppointmentsStore.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={appState.donor?.firstName}
      isFetching={availableAppointmentsStore.isFetching}
      defaultHospital={""}
    />
  );
}

export default observer(BookDonationScreenContainer);
