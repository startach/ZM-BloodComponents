import React, { useState } from "react";
import Button, { ButtonVariant } from "../../components/basic/Button";

import styles from "./RegisterScreen.module.scss";
import Input, { InputVariant } from "../../components/basic/Input";
import Logo from "../logo/Logo";

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

const RegisterScreen: React.FunctionComponent<RegisterScreenProps> = (
  props: RegisterScreenProps
) => {
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
    <div className={styles.screenSection}>
      <Logo />
      <div className={styles.title}>הירשם ובוא לתרום!</div>
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
        label="ססמא"
        errorMessage={passwordError}
      />
      <Input
        type="password"
        className={styles.inputField}
        onChangeText={(passwordCopyContent) => {
          setPasswordCopy(passwordCopyContent);
          setPasswordError("");
        }}
        value={passwordCopy}
        label="אימות סיסמה"
        variant={InputVariant.filled}
      />
      <Button
        className={styles.signinButton}
        title="הירשם"
        onClick={register}
      />
      <div className={styles.alreadyRegisteredContainer}>
        <Button
          className={styles.connectButton}
          title="התחבר"
          onClick={props.goToSignIn}
          variant={ButtonVariant.text}
        />
        <span className={styles.alreadyRegisteredTitle}>כבר רשום כתורם?</span>
      </div>
    </div>
  );
};

export default RegisterScreen;
