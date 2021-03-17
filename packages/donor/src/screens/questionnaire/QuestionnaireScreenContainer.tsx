import { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { BookedAppointment } from "@zm-blood-components/common";
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

const debugMode = process.env.NODE_ENV === "development";

export default function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    setIsLoading(true);

    if (debugMode) {
      console.log(
        "Asked to book one of the following appointments: ",
        props.donationSlot.appointmentIds
      );
    }

    const bookedAppointment = await FirebaseFunctions.bookAppointment(
      props.donationSlot.appointmentIds
    );

    if (debugMode) {
      console.log("Booked appointment", bookedAppointment.id);
    }

    props.setBookedAppointment(bookedAppointment);
    history.replace(MainNavigationKeys.UpcomingDonation);
  };

  return (
    <QuestionnaireScreen
      bookableAppointment={props.donationSlot}
      onSuccess={onSuccess}
      isLoading={isLoading}
      debugMode={debugMode}
    />
  );
}
