import React, { useState } from "react";
import Button, { ButtonVariant } from "../../components/basic/Button";
import styles from "../signin//SignInScreen.module.scss";
import Input from "../../components/basic/Input";
import Logo from "../logo/Logo";
import { Color } from "../../constants/colors";

export interface RegisterScreenProps {
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
    <div className={styles.screenSection}>
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
      <div className={styles.actionButton}>
        <Button
          title="הירשם"
          onClick={register}
          isDisabled={!(email && password)}
        />
      </div>

      <div className={styles.alternativeContainer}>
        <span className={styles.alternativeTitle}>כבר נרשמת?</span>
        <Button
          title="התחברות"
          onClick={props.goToSignIn}
          variant={ButtonVariant.text}
          color={Color.Secondary}
          className={styles.alternativeButton}
        />
      </div>
    </div>
  );
};

export default RegisterScreen;
