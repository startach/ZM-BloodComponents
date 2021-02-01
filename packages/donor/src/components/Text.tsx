import React from "react";
import { Text, TextProps } from "react-native";

export default function (props: TextProps & { children: string }) {
  return <Text {...props}>{props.children}</Text>;
}
