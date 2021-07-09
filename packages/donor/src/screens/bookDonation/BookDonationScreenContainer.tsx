import BookDonationScreen from "./BookDonationScreen";
import { Donor } from "@zm-blood-components/common";
import { Redirect, useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { observer } from "mobx-react-lite";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";

interface BookDonationScreenContainerProps {
  isLoggedIn: boolean;
  user?: Donor;
}

export function BookDonationScreenContainer({
  user,
  isLoggedIn,
}: BookDonationScreenContainerProps) {
  let history = useHistory();
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (isLoggedIn && appointmentToBookStore.hasAppointmentToBook()) {
    return <Redirect to={"/" + MainNavigationKeys.Questionnaire} />;
  }

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    appointmentToBookStore.setAppointmentToBook(donationSlot);
    if (isLoggedIn) {
      history.push(MainNavigationKeys.Questionnaire);
    } else {
      history.push(MainNavigationKeys.Register);
    }
  };

  return (
    <BookDonationScreen
      availableAppointments={availableAppointmentsStore.availableAppointments}
      onSlotSelected={onSlotSelected}
      firstName={user?.firstName}
      isFetching={availableAppointmentsStore.isFetching}
      defaultHospital={""}
    />
  );
}

export default observer(BookDonationScreenContainer);
