import React, { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import { useHistory } from "react-router-dom";

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

  const onBookDonation = (appointment: AvailableAppointment) => {
    FirebaseFunctions.bookAppointment(appointment.id);
    history.goBack();
  };

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
      onAppointmentSelect={onBookDonation}
      firstName={props.user.firstName}
    />
  );
}
