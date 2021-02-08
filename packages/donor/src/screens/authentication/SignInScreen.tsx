import React, { useState } from "react";
import Input from "../../components/Input";
import Text from "../../components/Text";
import Button from "../../components/Button/Button";

interface SignInScreenProps {
  onRegister: () => void;
  onResetPassword: () => void;
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => void;
}

export default function SignInScreen(props: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signIn = () => {
    props.onSignInWithEmail(email, password, setEmailError, setPasswordError);
  };

  return (
    <div>
      <Text>התחבר באמצעות דואר אלקטרוני</Text>
      <Input onChangeText={setEmail} placeholder={"דוא״ל"} />
      <Text>{emailError}</Text>
      <Input
        onChangeText={setPassword}
        value={password}
        type="password"
        placeholder={"סיסמה"}
      />
      <Text>{passwordError}</Text>
      <Button title="התחבר" onClick={signIn} />
      <Button title="איפוס סיסמה" onClick={props.onResetPassword} />
      <Button title="הרשמה" onClick={props.onRegister} />
    </div>
  );
}
