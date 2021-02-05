import React, { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";

export default function BookDonationScreenContainer() {
  const [availableAppointments, setAvailableAppointments] = useState(
    [] as AvailableAppointment[]
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
    />
  );
}
