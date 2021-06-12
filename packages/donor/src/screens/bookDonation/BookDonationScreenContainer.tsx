import { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";

interface BookDonationScreenContainerProps {
  user: Donor;
  setDonationSlotToBook: (donationSlot: DonationSlotToBook) => void;
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

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
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
