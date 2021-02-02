import React from "react";
import { View } from "react-native";
import Button from "../components/Button";

interface HomeScreenProps {
  onSignOut: () => void;
  goToExtendedSignupScreen: () => void;
  goToBookDonationScreen: () => void;
  goToUpcomingDonationScreen: () => void;
}

export default function (props: HomeScreenProps) {
  return (
    <View>
      <Button title="מסך הזנת פרטים" onPress={props.goToExtendedSignupScreen} />
      <Button
        title="מסך תרומה קרובה"
        onPress={props.goToUpcomingDonationScreen}
      />
      <Button title="מסך קביעת תרומה" onPress={props.goToBookDonationScreen} />
      <Button title="התנתק" onPress={props.onSignOut} />
    </View>
  );
}
