import React, { useState } from "react";
import Text from "../../components/Text";
import Button from "../register/MyButton";
import Logo from '../logo/Logo';
import styles from '../register/RegisterScreen.module.scss';
import myStyles from './SignInScreen.module.scss';
import Input from "../register/MyInput";

import classNames from 'classnames';
import PasswordInput from '../../components/PasswordInput';

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

  const EmailError = (emailError !== "" ?
      <div className={styles.errorMessage}>
        <Text>{emailError}</Text>
      </div> :
      null);
  const PasswordError = (passwordError !== "" ?
      <div className={styles.errorMessage}>
        <Text>{passwordError}</Text>
      </div> :
      null);

  return (
    <div>
      <Logo/>

      <div className={styles.title}>התחבר באמצעות דואר אלקטרוני</div>

      <div className={classNames(styles.screenSection, styles.inputTitleAndField)}>
        <div className={styles.inputTitle}>דוא״ל</div>
        <Input
            className={styles.inputField}
            onChangeText={(emailContent) => {
              setEmail(emailContent);
              setEmailError("");
            }}
            value={email}
        />
        {EmailError}
      </div>

      <div className={classNames(styles.screenSection, styles.inputTitleAndField)}>
        <div className={styles.inputTitle}>סיסמה</div>
        <PasswordInput
            className={styles.inputField}
            onChangeText={(passwordContent) => {
              setPassword(passwordContent);
              setPasswordError("")
            }}
            value={password}
        />
        {PasswordError}
      </div>

      <div className={styles.screenSection}>
        <Button
            className={styles.signinButton}
            title="התחבר"
            onClick={signIn}
        />
      </div>

      <div className={classNames(styles.screenSection, myStyles.resetButtonContainer)}>
        <Button
            className={classNames(myStyles.resetPasswordButton)}
            title="איפוס סיסמה"
            onClick={props.onResetPassword}
        />
      </div>

      <div className={classNames(styles.screenSection, styles.alreadyRegisteredContainer)}>
        <span className={styles.alreadyRegisteredTitle}>?עדיין לא רשום כתורם</span>
        <Button
            className={styles.connectButton}
            title="הרשמה"
            onClick={props.onRegister}
        />
      </div>
    </div>
  );
}
