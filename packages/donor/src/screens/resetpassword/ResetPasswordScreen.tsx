import { useState } from "react";
import SafeScreen from "../../components/basic/SafeScreen";
import Input from "../../components/basic/Input";
import Button, { ButtonVariant } from "../../components/basic/Button";
import Logo from "../logo/Logo";
import styles from "../register/RegisterScreen.module.scss";
import { Color } from "../../constants/colors";

interface ResetPasswordScreenProps {
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
    <SafeScreen className={styles.screenSection}>
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
      <Button title="איפוס סיסמה" onClick={resetPassword} />
      <br />
      <div         className={styles.alreadyRegistered}>
      <Button
        title="חזרה"
        variant={ButtonVariant.text}
        onClick={props.goToSignIn}
        color={Color.Pink}
      />
      </div>
    </SafeScreen>
  );
}
