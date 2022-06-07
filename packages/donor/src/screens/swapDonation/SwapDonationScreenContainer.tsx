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
import {
  BookedAppointment,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import { refreshAvailableAppointments } from "../../state/AvailableAppointmentsStore";
import useBookAppoitment from "../../hooks/useBookDonation";
import { async } from "@firebase/util";

interface SwapDonationScreenContainerProps {
  isLoggedIn: boolean;
  appState: AppStateType;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export function SwapDonationScreenContainer({
  appState,
  isLoggedIn,
  setBookedAppointment,
}: SwapDonationScreenContainerProps) {
  const navigate = useNavigate();
  const bookAppointment = useBookAppoitment();
  const [showDonationTooClosePopup, setShowDonationTooClosePopup] =
    useState(false);
  const [showSwapPopup, setShowSwapPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState<
    FunctionsApi.BookAppointmentStatus | undefined
  >();
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (!isLoggedIn || !appState.bookedAppointment) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }

  const isSameHospital = (hospital: Hospital) =>
    hospital === appState.bookedAppointment!.hospital;

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    appointmentToBookStore.setAppointmentToBook(donationSlot);
    if (isLoggedIn) {
      const isAppointmentTooClose =
        appointmentToBookStore.isAppointmentTooCloseToLastDonation(
          appState.donor!
        );
      if (isAppointmentTooClose) {
        setShowDonationTooClosePopup(true);
        return;
      }
      if (isSameHospital(donationSlot.hospital)) {
        setShowSwapPopup(true);
      } else {
        navigate(MainNavigationKeys.Questionnaire);
      }
    } else {
      navigate(MainNavigationKeys.Register);
    }
  };

  const onSwapDonation = async () => {
    setIsLoading(true);
    const response = await bookAppointment.tryBookAppoitment(
      true,
      appState.bookedAppointment!.id
    );
    setIsLoading(false);
    if (response.status === FunctionsApi.BookAppointmentStatus.SUCCESS) {
      bookAppointment.onSuccessfulBooking(() =>
        setBookedAppointment(response.bookedAppointment)
      );
    } else {
      setBookingError(response.status);
    }
  };

  const onSlotSelectedPopUpProps = {
    open: showDonationTooClosePopup,
    onApproved: async () => {
      isSameHospital(appointmentToBookStore.hospital)
        ? await onSwapDonation()
        : navigate(MainNavigationKeys.Questionnaire);
      setShowDonationTooClosePopup(false);
    },
    onBack: () => {
      setShowDonationTooClosePopup(false);
      navigate(MainNavigationKeys.SwapDonation);
    },
    onClose: () => {
      setShowDonationTooClosePopup(false);
      navigate(MainNavigationKeys.SwapDonation);
    },
  };

  const onBack = () => {
    navigate(MainNavigationKeys.UpcomingDonation);
  };

  return (
    <SwapDonationScreen
      availableAppointments={availableAppointmentsStore.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={appState.donor?.firstName}
      isFetching={availableAppointmentsStore.isFetching}
      tooCloseDonationPopupProps={onSlotSelectedPopUpProps}
      currentAppointment={appState.bookedAppointment}
      onSwapDonation={onSwapDonation}
      refreshAppointments={() =>
        refreshAvailableAppointments(availableAppointmentsStore)
      }
      bookingErrorCode={bookingError}
      onBack={onBack}
      showSwapPopup={showSwapPopup}
      closeSwapPopup={() => setShowSwapPopup(false)}
    />
  );
}

export default observer(SwapDonationScreenContainer);
