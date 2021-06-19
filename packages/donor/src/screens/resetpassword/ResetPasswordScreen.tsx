import { useState } from "react";
import Input from "../../components/basic/Input";
import Button, { ButtonVariant } from "../../components/basic/Button";
import Logo from "../logo/Logo";
import styles from "../signin//SignInScreen.module.scss";
import { Color } from "../../constants/colors";

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
    <div className={styles.screenSection}>
      <Logo />
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
      <div className={styles.textButton}>
        <Button
          title="חזרה"
          variant={ButtonVariant.text}
          onClick={props.goToSignIn}
          color={Color.Secondary}
        />
      </div>
    </div>
  );
}
