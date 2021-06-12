import React, { useState } from "react";
import Button, { ButtonVariant } from "../../components/basic/Button";
import SafeScreen from "../../components/basic/SafeScreen";
import styles from "./RegisterScreen.module.scss";
import Input from "../../components/basic/Input";
import Logo from "../logo/Logo";
import { Color } from "../../constants/colors";

interface RegisterScreenProps {
  onRegister: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => void;
  goToSignIn: () => void;
}

const RegisterScreen: React.FunctionComponent<RegisterScreenProps> = (
  props: RegisterScreenProps
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const register = () => {
    props.onRegister(email, password, setEmailError, setPasswordError);
  };

  return (
    <SafeScreen className={styles.screenSection}>
      <Logo />
      <div className={styles.title}>הרשמה</div>
      <Input
        onChangeText={(emailContent) => {
          setEmail(emailContent);
          setEmailError("");
        }}
        value={email}
        label={`דוא״ל`}
        type={"email"}
        errorMessage={emailError}
      />
      <Input
        type="password"
        onChangeText={(passwordContent) => {
          setPassword(passwordContent);
          setPasswordError("");
        }}
        value={password}
        label="סיסמה"
        errorMessage={passwordError}
      />
      <Button title="הירשם" onClick={register} />

      <div className={styles.alreadyRegistered}>
        <span>כבר נרשמת?</span>
        <Button
          title="התחברות"
          onClick={props.goToSignIn}
          variant={ButtonVariant.text}
          color={Color.Pink}
        />
      </div>
    </SafeScreen>
  );
};

export default RegisterScreen;
