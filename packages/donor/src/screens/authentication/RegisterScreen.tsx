import React, { useState } from "react";
import Input from "../../components/Input";
import Text from "../../components/Text";
import Button from "../../components/Button";

interface RegisterScreenProps {
  onRegister: (
    email: string,
    password: string,
    passwordCopy: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => void;
  goToSignIn: () => void;
}

export default function RegisterScreen(props: RegisterScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const register = () => {
    props.onRegister(
      email,
      password,
      passwordCopy,
      setEmailError,
      setPasswordError
    );
  };

  return (
    <div>
      <Text>הירשם ובוא לתרום</Text>
      <Input onChangeText={setEmail} value={email} placeholder={"דוא״ל"} />
      <Text>{emailError}</Text>
      <Input
        onChangeText={setPassword}
        value={password}
        type="password"
        placeholder={"סיסמה"}
      />
      <Input
        onChangeText={setPasswordCopy}
        value={passwordCopy}
        type="password"
        placeholder={"אימות סיסמה"}
      />
      <Text>{passwordError}</Text>
      <Button title="הירשם" onClick={register} />
      <Text>כבר רשום?</Text>
      <Button title="התחבר" onClick={props.goToSignIn} />
    </div>
  );
}
