import { useState } from "react";
import SafeScreen from "../../components/basic/SafeScreen";
import Button, { ButtonVariant } from "../../components/basic/Button";
import Logo from "../logo/Logo";
import styles from "./SignInScreen.module.scss";
import Input from "../../components/basic/Input";
import { Color } from "../../constants/colors";

export interface SignInScreenProps {
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
    await props.onSignInWithEmail(
      email,
      password,
      setEmailError,
      setPasswordError
    );
    setIsLoading(false);
  };

  return (
    <SafeScreen className={styles.screenSection}>
      <Logo />
      <div className={styles.title}>התחברות</div>
      <Input
        onChangeText={(emailContent) => {
          setEmail(emailContent);
          setEmailError("");
        }}
        value={email}
        type={"email"}
        label={`דוא"ל`}
        errorMessage={emailError}
      />
      <Input
        onChangeText={(passwordContent) => {
          setPassword(passwordContent);
          setPasswordError("");
        }}
        value={password}
        label="סיסמה"
        errorMessage={passwordError}
        onSubmit={signIn}
        type="password"
      />
      <div className={styles.actionButton}>
        <Button
          title="כניסה"
          onClick={signIn}
          isLoading={isLoading}
          isDisabled={!(email && password)}
        />
      </div>
      <div className={styles.textButton}>
        <Button
          title="שכחתי סיסמה"
          onClick={props.onResetPassword}
          variant={ButtonVariant.text}
          color={Color.Default}
        />
      </div>

      <div className={styles.alternativeContainer}>
        <span className={styles.alternativeTitle}>עדיין לא נרשמת?</span>
        <Button
          title="הרשמה"
          onClick={props.onRegister}
          variant={ButtonVariant.text}
          color={Color.Secondary}
          className={styles.alternativeButton}
        />
      </div>
    </SafeScreen>
  );
}
