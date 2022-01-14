import { useEffect, useState } from "react";
import { BookedDonationWithDonorDetails } from "@zm-blood-components/common";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useParams } from "react-router-dom";
import BookedAppointmentScreen from "./BookedAppointmentScreen";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import { getAppointmentCopyStringContent } from "../manageAppointmentsScreenOld/CopyAppointmentDetailsHelper";

export interface BookedAppointmentScreenContainerProps {
  loggedIn: boolean;
}

export default function BookedAppointmentScreenContainer(
  props: BookedAppointmentScreenContainerProps
) {
  const [bookedAppointment, setBookedAppointment] = useState<
    BookedDonationWithDonorDetails | undefined
  >();
  const { appointmentId } = useParams<{ appointmentId: string }>();

  useEffect(() => {
    if (!props.loggedIn || !appointmentId) {
      return;
    }
    CoordinatorFunctions.getBookedAppointment(appointmentId).then(
      setBookedAppointment
    );
  }, [props.loggedIn, appointmentId]);

  if (!props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  if (!appointmentId) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  return (
    <BookedAppointmentScreen
      appointment={bookedAppointment}
      onCopyAppointmentDetails={() => {
        if (!bookedAppointment) {
          return;
        }
        const name =
          bookedAppointment.firstName + " " + bookedAppointment.lastName;
        const content = getAppointmentCopyStringContent(
          name,
          bookedAppointment.phone,
          bookedAppointment.donationStartTimeMillis
        );
        navigator.clipboard.writeText(content);
      }}
      onRemoveDonor={() => {}} // TODO
    />
  );
}
