import { useEffect, useState } from "react";
import {
  AppointmentStatus,
  BookedDonationWithDonorDetails,
  DateUtils,
} from "@zm-blood-components/common";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BookedAppointmentScreen from "./BookedAppointmentScreen";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";

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
  const navigate = useNavigate();

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

  const onCopyAppointmentDetails = () => {
    if (!bookedAppointment) {
      return;
    }
    const name = bookedAppointment.firstName + " " + bookedAppointment.lastName;
    const content = getAppointmentCopyStringContent(
      name,
      bookedAppointment.phone,
      bookedAppointment.donationStartTimeMillis
    );
    navigator.clipboard.writeText(content);
  };

  const markAppointmentAsCompleted = (isNoShow: boolean) => {
    if (!bookedAppointment) {
      return;
    }
    CoordinatorFunctions.markAppointmentAsCompleted(appointmentId, isNoShow);
    setBookedAppointment({
      ...bookedAppointment,
      status: isNoShow ? AppointmentStatus.NOSHOW : AppointmentStatus.COMPLETED,
    });
  };

  return (
    <BookedAppointmentScreen
      appointment={bookedAppointment}
      onCopyAppointmentDetails={onCopyAppointmentDetails}
      onRemoveDonor={() => {
        CoordinatorFunctions.removeDonorFromAppointment(appointmentId).then(
          () => navigate(-1)
        );
      }}
      markAppointmentAsCompleted={markAppointmentAsCompleted}
    />
  );
}

function getAppointmentCopyStringContent(
  donorName: string,
  donorPhoneNumber: string,
  donationStartTimeMillis: number
) {
  return `${donorName}, ${String(donorPhoneNumber)}, ${DateUtils.ToDateString(
    donationStartTimeMillis
  )} ${DateUtils.ToTimeString(donationStartTimeMillis)}`;
}
