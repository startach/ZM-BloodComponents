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

export default function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const history = useHistory();
  const location = useLocation<QuestionnaireLocationState>();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    setIsLoading(true);
    console.log(location.state.donationSlot.appointmentIds);
    const bookedAppointment = await FirebaseFunctions.bookAppointment(
      location.state.donationSlot.appointmentIds
    );
    props.setBookedAppointment(bookedAppointment);
    history.goBack();
  };

  return (
    <QuestionnaireScreen
      bookableAppointment={location.state.donationSlot}
      onSuccess={onSuccess}
      isLoading={isLoading}
    />
  );
}
