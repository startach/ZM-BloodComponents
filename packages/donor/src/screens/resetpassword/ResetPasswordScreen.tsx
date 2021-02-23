import React, { useState } from "react";
import Input from "../../components/basic/Input";
import Button from "../../components/basic/Button";
import Logo from "../logo/Logo";
import styles from "../register/RegisterScreen.module.scss";

interface ResetPasswordScreenProps {
  onResetPassword: (email: string, error: (error: string) => void) => void;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const resetPassword = () => {
    props.onResetPassword(email, setError);
  };

  return (
    <div className={styles.screenSection}>
      <Logo />
      <div className={styles.title}>איפוס סיסמה</div>
      <Input
        className={styles.inputField}
        onChangeText={(emailContent) => {
          setEmail(emailContent);
          setError("");
        }}
        label={`דוא״ל`}
        variant="filled"
        value={email}
        type="email"
        errorMessage={error}
      />
      <Button
        className={styles.signinButton}
        title="איפוס סיסמה"
        onClick={resetPassword}
      />
    </div>
  );
}
