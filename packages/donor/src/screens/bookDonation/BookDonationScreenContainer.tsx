import BookDonationScreen from "./BookDonationScreen";
import {
  AvailableAppointment,
  Donor,
  Hospital,
} from "@zm-blood-components/common";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";

interface BookDonationScreenContainerProps {
  user: Donor;
  setDonationSlotToBook: (donationSlot: DonationSlotToBook) => void;
  availableAppointments: AvailableAppointment[];
}

export default function BookDonationScreenContainer(
  props: BookDonationScreenContainerProps
) {
  let history = useHistory();

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    props.setDonationSlotToBook(donationSlot);
    history.push(MainNavigationKeys.Questionnaire);
  };

  return (
    <BookDonationScreen
      availableAppointments={props.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={props.user.firstName}
      isFetching={false}
      defaultHospital={Hospital.BEILINSON}
    />
  );
}
