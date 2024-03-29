import { useState } from "react";
import styles from "./AuthScreens.module.scss";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";
import logoImage from "./../../assets/logo_drop_ZM.svg";

export interface SignInScreenProps {
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => Promise<void>;
  onForgotPassword: () => void;
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
    <div className={styles.screen}>
      <div className={styles.authScreenLogoContainer}>
        <img
          src={logoImage}
          className={styles.authScreenLogoImage}
          alt={"logo"}
        />
        <div className={styles.logoTitle}>זכרון מנחם</div>
        <div className={styles.subtitle}>מערכת רכז</div>
      </div>
      <div className={styles.screenContent}>
        <div className={styles.fields}>
          <div className={styles.loginScreenSecondaryHeader}>{"התחברות"}</div>
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
          <div className={styles.buttonsContainer}>
            <Button
              title={"התחברות"}
              onClick={signIn}
              isLoading={isLoading}
              isDisabled={!(email && password)}
            />
            <Button
              className={styles.forgotPasswordBtn}
              title="שכחתי את הסיסמה"
              onClick={props.onForgotPassword}
              variant={ButtonVariant.text}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
