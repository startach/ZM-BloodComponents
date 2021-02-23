import React, { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import { BookedAppointment } from "@zm-blood-components/common";
import { useHistory, useLocation } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { DonationSlot } from "../../utils/AppointmentsGrouper";

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

  const clearStateAndHistory = () => {
    history.replace("/", null);
  };

  useState(() => {
    if (!location.state.donationSlot) {
      clearStateAndHistory();
    }
  });

  const onSuccess = async () => {
    setIsLoading(true);

    if (debugMode) {
      console.log(
        "Asked to book one of the following appointments: ",
        location.state.donationSlot.appointmentIds
      );
    }

    const bookedAppointment = await FirebaseFunctions.bookAppointment(
      location.state.donationSlot.appointmentIds
    );

    if (debugMode) {
      console.log("Booked appointment", bookedAppointment.id);
    }

    props.setBookedAppointment(bookedAppointment);
    clearStateAndHistory();
  };

  return (
    <QuestionnaireScreen
      bookableAppointment={location.state.donationSlot}
      onSuccess={onSuccess}
      isLoading={isLoading}
      debugMode={debugMode}
    />
  );
}
