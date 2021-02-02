import React from "react";
import { View } from "react-native";
import { Hospital } from "@zm-blood-components/common";
import Text from "../components/Text";

interface UpcomingDonationScreenProps {
  nextDonation: Date;
  hospital: Hospital;
  onCancel: () => void;
}

export default function (props: UpcomingDonationScreenProps) {
  return (
    <View>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
}
