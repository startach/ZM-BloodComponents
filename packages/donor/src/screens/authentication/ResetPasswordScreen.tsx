import React, { useState } from "react";
import Input from "../../components/Input";
import { View } from "react-native";
import Text from "../../components/Text";
import Button from "../../components/Button";

interface ResetPasswordScreenProps {
  onResetPassword: (email: string, error: (error: string) => void) => void;
}

export default function (props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetPassword = () => {
    props.onResetPassword(email, setError);
  };

  return (
    <View>
      <Text>איפוס סיסמה</Text>
      <Input onChangeText={setEmail} value={email} placeholder={"דוא״ל"} />
      <Text>{error}</Text>
      <Button title="איפוס סיסמה" onPress={resetPassword} />
    </View>
  );
}
