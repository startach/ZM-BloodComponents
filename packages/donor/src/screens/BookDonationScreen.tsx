import React from "react";
import { View } from "react-native";
import { AvailableAppointment } from "@zm-blood-components/common";
import Text from "../components/Text";

interface BookDonationScreenProps {
  lastDonation: Date;
  earliestNextDonationDate: Date;
  availableAppointments: AvailableAppointment[];
}

export default function (props: BookDonationScreenProps) {
  return (
    <View>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
}
