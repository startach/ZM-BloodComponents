import { useState } from "react";
import styles from "./CoordinatorSigninScreen.module.scss";
import Button from "../../components/V2/Button";
import Input from "../../components/V2/Input";
import CoordinatorScreen from "../../components/V2/CoordinatorScreen";
import Card from "../../components/V2/Card";

export interface SignInScreenProps {
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
    <CoordinatorScreen className={styles.component}>
      <Card className={styles.card}>
        <div className={styles.title}>כניסה למערכת ניהול תורים</div>
        <Input
          onChange={(emailContent) => {
            setEmail(emailContent);
            setEmailError("");
          }}
          value={email}
          label={`דוא"ל`}
          variant="filled"
          errorMessage={emailError}
          className={styles.input}
        />
        <Input
          type="password"
          onChange={(passwordContent) => {
            setPassword(passwordContent);
            setPasswordError("");
          }}
          value={password}
          label="סיסמה"
          variant="filled"
          errorMessage={passwordError}
          className={styles.input}
        />
        <Button title="התחבר" onClick={signIn} className={styles.button} />
      </Card>
    </CoordinatorScreen>
  );
}
