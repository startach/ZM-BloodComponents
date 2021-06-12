import { useState } from "react";
import SafeScreen from "../../components/basic/SafeScreen";
import Button, { ButtonVariant } from "../../components/basic/Button";
import Logo from "../logo/Logo";
import styles from "../register/RegisterScreen.module.scss";
import myStyles from "./SignInScreen.module.scss";
import Input from "../../components/basic/Input";
import { Color } from "../../constants/colors";

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
      <Button
        className={styles.signinButton}
        title="כניסה"
        onClick={signIn}
        isLoading={isLoading}
      />
      <div className={myStyles.resetButtonContainer}>
        <Button
          title="איפוס סיסמה"
          onClick={props.onResetPassword}
          variant={ButtonVariant.text}
          color={Color.Gray}
        />
      </div>

      <div className={styles.notRegisteredContainer}>
        <Button
          title="הרשמה"
          onClick={props.onRegister}
          variant={ButtonVariant.text}
          color={Color.Pink}
        />
        <span className={styles.notRegisteredTitle}>עדיין לא נרשמת?</span>
      </div>
    </SafeScreen>
  );
}
