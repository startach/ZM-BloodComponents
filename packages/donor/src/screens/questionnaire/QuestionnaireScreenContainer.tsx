import React, { useState } from "react";
import QuestionnaireScreen from "./QuestionnaireScreen";
import {
  AvailableAppointment,
  BookedAppointment,
} from "@zm-blood-components/common";
import { useHistory, useLocation } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

interface QuestionnaireScreenContainerProps {
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export interface QuestionnaireLocationState {
  availableAppointment: AvailableAppointment;
}

export default function QuestionnaireScreenContainer(
  props: QuestionnaireScreenContainerProps
) {
  const history = useHistory();
  const location = useLocation<QuestionnaireLocationState>();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    setIsLoading(true);
    const bookedAppointment = await FirebaseFunctions.bookAppointment(
      location.state.availableAppointment.id
    );
    props.setBookedAppointment(bookedAppointment);
    history.goBack();
  };

  return (
    <QuestionnaireScreen
      availableAppointment={location.state.availableAppointment}
      onSuccess={onSuccess}
      isLoading={isLoading}
    />
  );
}
