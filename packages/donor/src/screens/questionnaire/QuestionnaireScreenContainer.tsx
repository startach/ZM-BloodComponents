import React, { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { BookedAppointment } from "@zm-blood-components/common";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { DonationSlot } from "../../utils/AppointmentsGrouper";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

interface QuestionnaireScreenContainerProps {
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export interface QuestionnaireLocationState {
  donationSlot: DonationSlot;
}

const debugMode = process.env.NODE_ENV === "development";

export default function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const history = useHistory();
  const location = useLocation<QuestionnaireLocationState>();
  const [isLoading, setIsLoading] = useState(false);

  let donationSlot = location?.state?.donationSlot;

  if (!donationSlot) {
    return <Redirect to={"/" + MainNavigationKeys.BookDonation} />;
  }

  const onSuccess = async () => {
    setIsLoading(true);

    if (debugMode) {
      console.log(
        "Asked to book one of the following appointments: ",
        donationSlot.appointmentIds
      );
    }

    const bookedAppointment = await FirebaseFunctions.bookAppointment(
      donationSlot.appointmentIds
    );

    if (debugMode) {
      console.log("Booked appointment", bookedAppointment.id);
    }

    props.setBookedAppointment(bookedAppointment);
    history.replace(MainNavigationKeys.UpcomingDonation);
  };

  return (
    <QuestionnaireScreen
      bookableAppointment={donationSlot}
      onSuccess={onSuccess}
      isLoading={isLoading}
      debugMode={debugMode}
    />
  );
}
