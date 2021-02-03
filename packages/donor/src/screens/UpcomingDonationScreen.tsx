import React from "react";
import { Hospital } from "@zm-blood-components/common";
import Text from "../components/Text";

interface UpcomingDonationScreenProps {
  nextDonation: Date;
  hospital: Hospital;
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
