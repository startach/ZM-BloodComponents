import { BookedAppointment, Donor } from "@zm-blood-components/common";
import UpcomingDonationScreen from "./UpcomingDonationScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { redirectToBookDonation } from "../../navigation/AppRouter";
import { useAppointmentToBookStore } from "../../state/Providers";
import { shouldDisplaySameDayDonationPopup } from "./SameDayDonationUtil";

interface UpcomingDonationScreenContainerProps {
  user: Donor;
  bookedAppointment?: BookedAppointment;
  setBookedAppointment: (bookedAppointment?: BookedAppointment) => void;
}

export default function UpcomingDonationScreenContainer(
  props: UpcomingDonationScreenContainerProps
) {
  const appointmentToBookStore = useAppointmentToBookStore();
  if (!props.bookedAppointment) {
    return redirectToBookDonation();
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
      showSameDayDonationPopup={shouldDisplaySameDayDonationPopup(
        new Date(),
        props.bookedAppointment
      )}
    />
  );
}
