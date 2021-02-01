import React, { useState } from "react";
import Input from "../components/Input";
import { View } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";

interface SignInScreenProps {
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => void;
}

export default function (props: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signIn = () => {
    props.onSignInWithEmail(email, password, setEmailError, setPasswordError);
  };

  return (
    <View>
      <Text>התחבר באמצעות דואר אלקטרוני</Text>
      <Input onChangeText={setEmail} value={email} placeholder={"דוא״ל"} />
      <Text>{emailError}</Text>
      <Input
        onChangeText={setPassword}
        value={password}
        placeholder={"סיסמה"}
        textContentType="password"
        passwordRules="לפחות 6 תווים"
        onSubmitEditing={signIn}
      />
      <Text>{passwordError}</Text>
      <Button title="התחבר" onPress={signIn} />
    </View>
  );
}
