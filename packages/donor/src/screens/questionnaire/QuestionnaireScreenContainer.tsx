import { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { BookedAppointment, FunctionsApi } from "@zm-blood-components/common";
import { Navigate, useNavigate } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { refreshAvailableAppointments } from "../../state/AvailableAppointmentsStore";
import { observer } from "mobx-react-lite";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<
    FunctionsApi.BookAppointmentStatus | undefined
  >();
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (!props.loggedIn) return <Navigate to={MainNavigationKeys.BookDonation} />;
  if (props.pendingCompletionAppointmentsCount !== 0)
    return <Navigate to={MainNavigationKeys.Approve} />;
  if (props.bookedAppointment)
    return <Navigate to={MainNavigationKeys.UpcomingDonation} />;

  if (!appointmentToBookStore.hasAppointmentToBook()) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }

  const onSuccess = async () => {
    setIsLoading(true);

    if (debugMode) {
      console.log(
        "Asked to book one of the following appointments: ",
        appointmentToBookStore.appointmentIds
      );
    }

    const bookAppointmentResponse =
      await FirebaseFunctions.donorBookAppointment(
        appointmentToBookStore.appointmentIds
      );

    switch (bookAppointmentResponse.status) {
      case FunctionsApi.BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER:
      case FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS:
      case FunctionsApi.BookAppointmentStatus.NO_SUCH_APPOINTMENTS:
        setError(bookAppointmentResponse.status);
        setIsLoading(false);
        break;

      case FunctionsApi.BookAppointmentStatus.SUCCESS:
        if (debugMode) {
          console.log(
            "Booked appointment",
            bookAppointmentResponse.bookedAppointment!.id
          );
        }

        props.setBookedAppointment(bookAppointmentResponse.bookedAppointment!);
        navigate(MainNavigationKeys.UpcomingDonation, { replace: true });
        appointmentToBookStore.clear();
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
      errorCode={error}
      onBack={onBack}
      goToHomePage={async () => {
        appointmentToBookStore.clear();
        refreshAvailableAppointments(availableAppointmentsStore);
        navigate(-1);
      }}
    />
  );
}

export default observer(QuestionnaireScreenContainer);
