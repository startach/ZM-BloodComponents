import React, { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { QuestionnaireLocationState } from "../questionnaire/QuestionnaireScreenContainer";
import { DonationSlot } from "../../utils/AppointmentsGrouper";

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

  const onSlotSelected = (donationSlot: DonationSlot) => {
    const routerProps: QuestionnaireLocationState = {
      donationSlot,
    };
    history.push(MainNavigationKeys.Questionnaire, routerProps);
  };

  return (
    <BookDonationScreen
      lastDonation={new Date(2021, 0, 13)}
      earliestNextDonationDate={new Date(2021, 1, 13)}
      availableAppointments={fetchingState.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={props.user.firstName}
      isFetching={fetchingState.isFetching}
    />
  );
}
