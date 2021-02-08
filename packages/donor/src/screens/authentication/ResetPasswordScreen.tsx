import React, { useState } from "react";
import Input from "../../components/Input";
import Text from "../../components/Text";
import Button from "../../components/Button";

interface ResetPasswordScreenProps {
  onResetPassword: (email: string, error: (error: string) => void) => void;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetPassword = () => {
    props.onResetPassword(email, setError);
  };

  return (
    <div>
      <Text>איפוס סיסמה</Text>
      <Input onChangeText={setEmail} placeholder={"דוא״ל"} />
      <Text>{error}</Text>
      <Button title="איפוס סיסמה" onClick={resetPassword} />
    </div>
  );
}
