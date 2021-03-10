import React, { useState } from "react";
import Button, { ButtonVariant } from "../../components/basic/Button";
import Logo from "../logo/Logo";
import styles from "../register/RegisterScreen.module.scss";
import myStyles from "./SignInScreen.module.scss";
import Input, { InputVariant } from "../../components/basic/Input";

import classNames from "classnames";

interface SignInScreenProps {
  onRegister: () => void;
  onResetPassword: () => void;
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => Promise<boolean>;
}

export default function SignInScreen(props: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    setIsLoading(true);
    const success = await props.onSignInWithEmail(
      email,
      password,
      setEmailError,
      setPasswordError
    );
    if (!success) {
      setIsLoading(false);
    }
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
        type={"email"}
        label={`דוא"\ל`}
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
        label="ססמא"
        variant={InputVariant.filled}
        errorMessage={passwordError}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            signIn();
          }
        }}
      />
      <div className={styles.screenSection}>
        <Button
          className={styles.signinButton}
          title="התחבר"
          onClick={signIn}
          isLoading={isLoading}
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
          variant={ButtonVariant.text}
        />
      </div>

      <div className={styles.notRegisteredContainer}>
        <Button
          className={styles.connectButton}
          title="הרשמה"
          onClick={props.onRegister}
          variant={ButtonVariant.text}
        />
        <span className={styles.notRegisteredTitle}>עדיין לא רשום כתורם?</span>
      </div>
    </div>
  );
}
