import React, { useState } from "react";
import Button, { ButtonVariant } from "../../components/basic/Button";
import SafeScreen from "../../components/basic/SafeScreen";
import styles from "./RegisterScreen.module.scss";
import Input, { InputVariant } from "../../components/basic/Input";
import Logo from "../logo/Logo";

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
        className={styles.inputField}
        onChangeText={(emailContent) => {
          setEmail(emailContent);
          setEmailError("");
        }}
        value={email}
        label={`דוא״ל`}
        type={"email"}
        variant={InputVariant.filled}
        errorMessage={emailError}
      />
      <Input
        type="password"
        className={styles.inputField}
        onChangeText={(passwordContent) => {
          setPassword(passwordContent);
          setPasswordError("");
        }}
        value={password}
        variant={InputVariant.filled}
        label="סיסמה"
        errorMessage={passwordError}
      />
      <Button
        className={styles.signinButton}
        title="הירשם"
        onClick={register}
      />

      <div className={styles.alreadyRegistered}>
        <span>כבר נרשמת?</span>
        <Button
          className={styles.connectButton}
          title="התחברות"
          onClick={props.goToSignIn}
          variant={ButtonVariant.text}
        />
      </div>
    </SafeScreen>
  );
};

export default RegisterScreen;
