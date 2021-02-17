import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

interface SignInScreenProps {
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => void;
}

export default function CoordinatorSignInScreen(props: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const signIn = () => {
    props.onSignInWithEmail(email, password, setEmailError, setPasswordError);
  };

  return (
    <div>
      <Input
        onChangeText={(emailContent) => {
          setEmail(emailContent);
          setEmailError("");
        }}
        value={email}
        label={`דוא"\ל`}
        variant="filled"
        errorMessage={emailError}
      />
      <Input
        type="password"
        onChangeText={(passwordContent) => {
          setPassword(passwordContent);
          setPasswordError("");
        }}
        value={password}
        label="ססמא"
        variant="filled"
        errorMessage={passwordError}
      />
      <div>
        <Button title="התחבר" onClick={signIn} />
      </div>
    </div>
  );
}
