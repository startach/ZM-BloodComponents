import { useState } from "react";
import Button, { ButtonVariant } from "../../../components/basic/Button";
import styles from "./SignInScreen.module.scss";
import Input from "../../../components/basic/Input";
import { Color } from "../../../constants/colors";
import ZMScreen from "../../../components/basic/ZMScreen";
import LoginIllustration from "../../../assets/images/LogIn-illustration.svg";

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
    <ZMScreen className={styles.screenSection} padding hasBackButton>
      <div className={styles.screenContent}>
        <img
          src={LoginIllustration}
          className={styles.loginIllustration}
          alt="illustration"
        />
        <div className={styles.title}>טוב לראותך שוב</div>
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
            title="התחברות"
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
            className={styles.textButtonColor}
          />
        </div>
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
    </ZMScreen>
  );
}
