import React, { useState } from "react";
import Input from "./MyInput";
import Text from "../../components/Text";
import Button from "./MyButton";

import styles from './RegisterScreen.module.scss';
import classNames from 'classnames';
import PasswordInput from '../../components/PasswordInput';
import Logo from '../logo/Logo';

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

const RegisterScreen: React.FunctionComponent<RegisterScreenProps> = (props: RegisterScreenProps) => {
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

      <div className={styles.title}>הירשם ובוא לתרום</div>

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

      <div className={classNames(styles.screenSection, styles.inputTitleAndField)}>
      <div className={styles.inputTitle}>אימות סיסמה</div>
        <PasswordInput
          className={styles.inputField}
          onChangeText={(passwordCopyContent) => {
            setPasswordCopy(passwordCopyContent);
            setPasswordError("")
          }}
          value={passwordCopy}
        />
      </div>

      <div className={styles.screenSection}>
        <Button
            className={styles.signinButton}
            title="הירשם"
            onClick={register}
        />
      </div>

      <div className={classNames(styles.screenSection, styles.alreadyRegisteredContainer)}>
        <span className={styles.alreadyRegisteredTitle}>?כבר רשום כתורם</span>
        <Button
            className={styles.connectButton}
            title="התחבר"
            onClick={props.goToSignIn}
        />
      </div>
    </div>
  );
}

export default RegisterScreen;