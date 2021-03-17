import { useState } from "react";
import styles from "./CoordinatorSigninScreen.module.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ScreenWrapper from "../../components/ScreenWrapper";

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
    <ScreenWrapper className={styles.component}>
      <Input
        onChange={(emailContent) => {
          setEmail(emailContent);
          setEmailError("");
        }}
        value={email}
        label={`דוא"ל`}
        variant="filled"
        errorMessage={emailError}
      />
      <Input
        type="password"
        onChange={(passwordContent) => {
          setPassword(passwordContent);
          setPasswordError("");
        }}
        value={password}
        label="ססמא"
        variant="filled"
        errorMessage={passwordError}
      />
      <Button title="התחבר" onClick={signIn} />
    </ScreenWrapper>
  );
}
