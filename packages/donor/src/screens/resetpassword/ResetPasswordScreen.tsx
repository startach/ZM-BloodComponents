import React, { useState } from "react";
import Input from "../register/MyInput";
import Text from "../../components/Text";
import Button from "../register/MyButton";
import Logo from '../logo/Logo';
import styles from '../register/RegisterScreen.module.scss';
import classNames from 'classnames';

interface ResetPasswordScreenProps {
  onResetPassword: (email: string, error: (error: string) => void) => void;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetPassword = () => {
    props.onResetPassword(email, setError);
  };

  const EmailError = (error !== "" ?
      <div className={styles.errorMessage}>
        <Text>{error}</Text>
      </div> :
      null);

  return (
    <div>
      <Logo />

      <div className={styles.title}>איפוס סיסמה</div>

      <div className={classNames(styles.screenSection, styles.inputTitleAndField)}>
        <div className={styles.inputTitle}>דוא״ל</div>
        <Input
            className={styles.inputField}
            onChangeText={(emailContent) => {
              setEmail(emailContent);
              setError("");
            }}
            value={email}
        />
        {EmailError}
      </div>

      <div className={styles.screenSection}>
        <Button
            className={styles.signinButton}
            title="איפוס סיסמה"
            onClick={resetPassword}
        />
      </div>
    </div>
  );
}
