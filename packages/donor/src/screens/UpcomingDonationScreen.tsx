import React from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import Text from "../components/Text";

interface UpcomingDonationScreenProps {
  upcomingDonations: BookedAppointment[];
  onCancel: () => void;
}

export default function UpcomingDonationScreen(
  props: UpcomingDonationScreenProps
) {
  return (
    <div>
      <Text>{JSON.stringify(props)}</Text>
    </div>
  );
}
