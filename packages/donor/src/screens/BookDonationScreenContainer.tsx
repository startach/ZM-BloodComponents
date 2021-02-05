import React, { useEffect, useState } from "react";
import BookDonationScreen from "./BookDonationScreen";
import {
  AvailableAppointment,
  FunctionsApi,
} from "@zm-blood-components/common";
import firebase from "firebase/app";
import "firebase/functions";

export default function BookDonationScreenContainer() {
  const [availableAppointments, setAvailableAppointments] = useState(
    [] as AvailableAppointment[]
  );

  useEffect(() => {
    const getAvailableAppointmentsFunction = firebase
      .functions()
      .httpsCallable(FunctionsApi.GetAvailableAppointmentsFunctionName);
    getAvailableAppointmentsFunction().then((res) => {
      const response = res.data as FunctionsApi.GetAvailableAppointmentsResponse;
      const appointments: AvailableAppointment[] = response.availableAppointments.map(
        (appointments) => ({
          id: appointments.id,
          donationStartTime: new Date(appointments.donationStartTimeMillis),
          hospital: appointments.hospital,
        })
      );
      setAvailableAppointments(appointments);
    });
  }, []);

  return (
    <BookDonationScreen
      lastDonation={new Date(2021, 0, 13)}
      earliestNextDonationDate={new Date(2021, 1, 13)}
      availableAppointments={availableAppointments}
    />
  );
}
