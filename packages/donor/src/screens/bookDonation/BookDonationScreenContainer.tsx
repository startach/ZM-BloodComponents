import BookDonationScreen from "./BookDonationScreen";
import { Donor } from "@zm-blood-components/common";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";
import { useAvailableAppointmentsStore } from "../../state/Providers";
import { observer } from "mobx-react-lite";

interface BookDonationScreenContainerProps {
  user: Donor;
  setDonationSlotToBook: (donationSlot: DonationSlotToBook) => void;
}

export function BookDonationScreenContainer(
  props: BookDonationScreenContainerProps
) {
  let history = useHistory();
  const availableAppointmentsStore = useAvailableAppointmentsStore();

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    props.setDonationSlotToBook(donationSlot);
    history.push(MainNavigationKeys.Questionnaire);
  };

  return (
    <BookDonationScreen
      availableAppointments={availableAppointmentsStore.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={props.user.firstName}
      isFetching={availableAppointmentsStore.isFetching}
      defaultHospital={""}
    />
  );
}

export default observer(BookDonationScreenContainer);
