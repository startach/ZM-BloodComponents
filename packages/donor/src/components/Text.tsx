import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export default function (props: TextProps & { children: string }) {
  return (
    <Text style={styles.text} {...props}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
});
