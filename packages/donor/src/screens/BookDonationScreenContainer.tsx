import React from "react";
import BookDonationScreen from "./BookDonationScreen";
import { AvailableAppointment, Hospital } from "@zm-blood-components/common";

export default function () {
  const availableAppointments: AvailableAppointment[] = [
    {
      id: "availableAppointment1",
      donationStartTime: new Date(2021, 3, 13, 13, 30),
      hospital: Hospital.TEL_HASHOMER,
    },
    {
      id: "availableAppointment2",
      donationStartTime: new Date(2021, 3, 13, 14, 30),
      hospital: Hospital.TEL_HASHOMER,
    },
    {
      id: "availableAppointment3",
      donationStartTime: new Date(2021, 3, 16, 10, 0),
      hospital: Hospital.TEL_HASHOMER,
    },
  ];

  return (
    <BookDonationScreen
      lastDonation={new Date(2021, 0, 13)}
      earliestNextDonationDate={new Date(2021, 1, 13)}
      availableAppointments={availableAppointments}
    />
  );
}
