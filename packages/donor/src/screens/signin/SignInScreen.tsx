import React, { useState } from "react";
import Button from "../../components/basic/Button";
import Logo from "../logo/Logo";
import styles from "../register/RegisterScreen.module.scss";
import myStyles from "./SignInScreen.module.scss";
import Input from "../../components/basic/Input";

import classNames from "classnames";

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
    <div className={styles.screenSection}>
      <Logo />
      <div className={styles.title}>התחבר באמצעות דואר אלקטרוני</div>
      <Input
        className={styles.inputField}
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
        className={styles.inputField}
        onChangeText={(passwordContent) => {
          setPassword(passwordContent);
          setPasswordError("");
        }}
        value={password}
        label="ססמא"
        variant="filled"
        errorMessage={passwordError}
      />
      <div className={styles.screenSection}>
        <Button
          className={styles.signinButton}
          title="התחבר"
          onClick={signIn}
        />
      </div>
      <div
        className={classNames(
          styles.screenSection,
          myStyles.resetButtonContainer
        )}
      >
        <Button
          className={classNames(myStyles.resetPasswordButton)}
          title="איפוס סיסמה"
          onClick={props.onResetPassword}
          variant="text"
        />
      </div>

      <div className={styles.alreadyRegisteredContainer}>
        <Button
          className={styles.connectButton}
          title="הרשמה"
          onClick={props.onRegister}
          variant="text"
        />
        <span className={styles.alreadyRegisteredTitle}>
          עדיין לא רשום כתורם?
        </span>
      </div>
    </div>
  );
}
