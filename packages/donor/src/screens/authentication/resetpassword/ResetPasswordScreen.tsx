import React, { useState } from "react";
import Input from "../../../components/basic/Input";
import Button from "../../../components/basic/Button";
import styles from "../signin//SignInScreen.module.scss";
import ZMScreen from "../../../components/basic/ZMScreen";
import ResetPasswordIllustration from "../../../assets/images/password reset-illustration.svg";

export interface ResetPasswordScreenProps {
  onResetPassword: (email: string, error: (error: string) => void) => void;
  goToSignIn: () => void;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetPassword = () => {
    props.onResetPassword(email, setError);
  };

  return (
    <ZMScreen className={styles.screenSection} hasBackButton>
      <div className={styles.screenContent}>
        <img
          src={ResetPasswordIllustration}
          className={styles.loginIllustration}
          alt="illustration"
        />
        <div className={styles.title}>איפוס סיסמה</div>
        <Input
          onChangeText={(emailContent) => {
            setEmail(emailContent);
            setError("");
          }}
          label={`דוא״ל`}
          value={email}
          type="email"
          errorMessage={error}
        />
        <div className={styles.actionButton}>
          <Button
            title="איפוס סיסמה"
            onClick={resetPassword}
            isDisabled={!email}
          />
        </div>
      </div>
    </ZMScreen>
  );
}
