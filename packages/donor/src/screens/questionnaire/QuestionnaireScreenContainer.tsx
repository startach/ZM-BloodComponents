import { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { BookedAppointment, FunctionsApi } from "@zm-blood-components/common";
import { Redirect, useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { refreshAvailableAppointments } from "../../state/AvailableAppointmentsStore";
import { observer } from "mobx-react-lite";

interface QuestionnaireScreenContainerProps {
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

const debugMode = !process.env.REACT_APP_PRODUCTION_FIREBASE;

export function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] =
    useState<FunctionsApi.BookAppointmentStatus | undefined>();
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (!appointmentToBookStore.hasBookedAppointment()) {
    return <Redirect to={"/" + MainNavigationKeys.BookDonation} />;
  }

  const onSuccess = async () => {
    setIsLoading(true);

    if (debugMode) {
      console.log(
        "Asked to book one of the following appointments: ",
        appointmentToBookStore.appointmentIds
      );
    }

    const bookAppointmentResponse = await FirebaseFunctions.bookAppointment(
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
        history.replace(MainNavigationKeys.UpcomingDonation);
    }
  };

  return (
    <QuestionnaireScreen
      hospital={appointmentToBookStore.hospital}
      donationStartTimeMillis={appointmentToBookStore.donationStartTimeMillis}
      onSuccess={onSuccess}
      isLoading={isLoading}
      debugMode={debugMode}
      errorCode={error}
      goToHomePage={async () => {
        refreshAvailableAppointments(availableAppointmentsStore);
        history.goBack();
      }}
    />
  );
}

export default observer(QuestionnaireScreenContainer);
