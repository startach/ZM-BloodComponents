import {
  BookedAppointment,
  Donor,
  AppointmentUtils,
} from "@zm-blood-components/common";
import UpcomingDonationScreen from "./UpcomingDonationScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { useAppointmentToBookStore } from "../../state/Providers";
import { Navigate } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

interface UpcomingDonationScreenContainerProps {
  loggedIn: boolean;
  pendingCompletionAppointmentsCount: number;
  user: Donor;
  bookedAppointment?: BookedAppointment;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export default function UpcomingDonationScreenContainer(
  props: UpcomingDonationScreenContainerProps
) {
  const appointmentToBookStore = useAppointmentToBookStore();
  if (!props.loggedIn || !props.bookedAppointment) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }
  if (props.pendingCompletionAppointmentsCount !== 0) {
    return <Navigate to={MainNavigationKeys.Approve} />;
  }

  const onCancelAppointment = async () => {
    appointmentToBookStore.clear();
    await FirebaseFunctions.cancelAppointment(props.bookedAppointment!.id);
    props.setBookedAppointment(undefined);
  };

  return (
    <UpcomingDonationScreen
      bookedAppointment={props.bookedAppointment}
      fullName={props.user.firstName + " " + props.user.lastName}
      onCancel={onCancelAppointment}
      showDonationPopup={AppointmentUtils.isAppointmentClose(
        props.bookedAppointment
      )}
    />
  );
}
