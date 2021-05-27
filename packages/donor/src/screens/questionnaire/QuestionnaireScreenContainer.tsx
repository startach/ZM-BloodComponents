import { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { BookedAppointment ,FunctionsApi} from "@zm-blood-components/common";
import { useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { DonationSlot } from "../../utils/AppointmentsGrouper";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

interface QuestionnaireScreenContainerProps {
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
  donationSlot: DonationSlot;
}

export type QuestionnaireRoutingProps = {
  donationSlot: DonationSlot;
};

const debugMode = !process.env.REACT_APP_PRODUCTION_FIREBASE;

export default function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FunctionsApi.BookAppointmentStatus | undefined>();

  const onSuccess = async () => {
    setIsLoading(true);

    if (debugMode) {
      console.log(
        "Asked to book one of the following appointments: ",
        props.donationSlot.appointmentIds
      );
    }

    const bookAppointmentResponse = await FirebaseFunctions.bookAppointment(
      props.donationSlot.appointmentIds
    );

    switch (bookAppointmentResponse.status) {
      case FunctionsApi.BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER:
      case FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS:
        setError(bookAppointmentResponse.status);
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
      bookableAppointment={props.donationSlot}
      onSuccess={onSuccess}
      isLoading={isLoading}
      debugMode={debugMode}
      errorCode={error}
    />
  );
}
