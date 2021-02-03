import React from "react";
import { TextInputProps, TextInput, StyleSheet } from "react-native";

export default function Input(props: TextInputProps) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    textAlign: "right",
  },
});
