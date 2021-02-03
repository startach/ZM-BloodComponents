import React from "react";
import { AvailableAppointment } from "@zm-blood-components/common";
import Text from "../components/Text";

interface BookDonationScreenProps {
  lastDonation: Date;
  earliestNextDonationDate: Date;
  availableAppointments: AvailableAppointment[];
}

export default function BookDonationScreen(props: BookDonationScreenProps) {
  return (
    <div>
      <Text>{JSON.stringify(props)}</Text>
    </div>
  );
}
