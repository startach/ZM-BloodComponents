import { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { BookedAppointment, FunctionsApi } from "@zm-blood-components/common";
import { Navigate, useNavigate } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { refreshAvailableAppointments } from "../../state/AvailableAppointmentsStore";
import { observer } from "mobx-react-lite";
import useBookAppoitment from "../../hooks/useBookDonation";

interface QuestionnaireScreenContainerProps {
  loggedIn: boolean;
  bookedAppointment?: BookedAppointment;
  pendingCompletionAppointmentsCount: number;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

const debugMode = !process.env.REACT_APP_PRODUCTION_FIREBASE;

export function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const navigate = useNavigate();
  const bookAppointment = useBookAppoitment();
  const [bookingError, setBookingError] = useState<
    FunctionsApi.BookAppointmentStatus | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (!props.loggedIn) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }
  if (props.pendingCompletionAppointmentsCount !== 0) {
    return <Navigate to={MainNavigationKeys.Approve} />;
  }
  if (props.bookedAppointment && !appointmentToBookStore.isSwapAppointment) {
    return <Navigate to={MainNavigationKeys.UpcomingDonation} />;
  }

  if (!appointmentToBookStore.hasAppointmentToBook()) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }

  const onSuccess = async () => {
    setIsLoading(true);
    const response = await bookAppointment.tryBookAppoitment(
      appointmentToBookStore.isSwapAppointment,
      props.bookedAppointment?.id
    );
    setIsLoading(false);
    if (response.status === FunctionsApi.BookAppointmentStatus.SUCCESS) {
      bookAppointment.onSuccessfulBooking(() =>
        props.setBookedAppointment(response.bookedAppointment)
      );
    } else {
      setBookingError(response.status);
    }
  };

  const onBack = () => {
    appointmentToBookStore.clear();
    navigate(-1);
  };

  return (
    <QuestionnaireScreen
      hospital={appointmentToBookStore.hospital}
      donationStartTimeMillis={appointmentToBookStore.donationStartTimeMillis}
      onSuccess={onSuccess}
      isLoading={isLoading}
      debugMode={debugMode}
      onBack={onBack}
      goBackAndRefresh={async () => {
        appointmentToBookStore.clear();
        refreshAvailableAppointments(availableAppointmentsStore);
        navigate(-1);
      }}
      isSwapAppointment={appointmentToBookStore.isSwapAppointment}
      bookingErrorCode={bookingError}
    />
  );
}

export default observer(QuestionnaireScreenContainer);
