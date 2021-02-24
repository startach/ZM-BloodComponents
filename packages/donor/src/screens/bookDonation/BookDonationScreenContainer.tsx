import React, { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { DonationSlot } from "../../utils/AppointmentsGrouper";

interface BookDonationScreenContainerProps {
  user: Donor;
  setDonationSlotToBook: (donationSlot: DonationSlot) => void;
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
    props.setDonationSlotToBook(donationSlot);
    history.push(MainNavigationKeys.Questionnaire);
  };

  return (
    <BookDonationScreen
      availableAppointments={fetchingState.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={props.user.firstName}
      isFetching={fetchingState.isFetching}
    />
  );
}
