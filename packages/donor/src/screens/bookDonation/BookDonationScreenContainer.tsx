import React, { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { QuestionnaireLocationState } from "../questionnaire/QuestionnaireScreenContainer";

interface BookDonationScreenContainerProps {
  user: Donor;
}

export default function BookDonationScreenContainer(
  props: BookDonationScreenContainerProps
) {
  let history = useHistory();

  const [fetchingState, setFetchingState] = useState({
    availableAppointments: [] as AvailableAppointment[],
    isFetching: true,
  });

  useEffect(() => {
    FirebaseFunctions.getAvailableAppointments().then((appointments) =>
      setFetchingState({
        availableAppointments: appointments,
        isFetching: false,
      })
    );
  }, []);

  const onAppointmentSelect = (appointment: AvailableAppointment) => {
    const routerProps: QuestionnaireLocationState = {
      availableAppointment: appointment,
    };
    history.push(MainNavigationKeys.Questionnaire, routerProps);
  };

  return (
    <BookDonationScreen
      lastDonation={new Date(2021, 0, 13)}
      earliestNextDonationDate={new Date(2021, 1, 13)}
      availableAppointments={fetchingState.availableAppointments}
      onAppointmentSelect={onAppointmentSelect}
      firstName={props.user.firstName}
      isFetching={fetchingState.isFetching}
    />
  );
}
