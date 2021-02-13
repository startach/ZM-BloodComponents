import React, { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { useHistory } from "react-router-dom";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";

interface BookDonationScreenContainerProps {
  user: Donor;
}

export default function BookDonationScreenContainer(
  props: BookDonationScreenContainerProps
) {
  let history = useHistory();

  const [availableAppointments, setAvailableAppointments] = useState(
    [] as AvailableAppointment[]
  );

  const handleRegisterAppointment = React.useCallback(
    (appointment: AvailableAppointment) =>
      history.push(`/${MainNavigationKeys.UpcomingDonation}/${appointment.id}`),
    []
  );

  useEffect(() => {
    FirebaseFunctions.getAvailableAppointments().then((appointments) =>
      setAvailableAppointments(appointments)
    );
  }, []);

  return (
    <BookDonationScreen
      lastDonation={new Date(2021, 0, 13)}
      earliestNextDonationDate={new Date(2021, 1, 13)}
      availableAppointments={availableAppointments}
      onAppointmentSelect={handleRegisterAppointment}
      firstName={props.user.firstName}
    />
  );
}