import React from "react";
import { View } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";

interface HomeScreenProps {
  onSignOut: () => void;
}

export default function (props: HomeScreenProps) {
  return (
    <View>
      <Text>Home Screen</Text>

      <Button title="התנתק" onPress={props.onSignOut} />
    </View>
  );
}
