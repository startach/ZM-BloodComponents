import { useState } from "react";
import styles from "./SignInScreen.module.scss";
import CoordinatorHeader from "../../components/AppHeader";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";
import { async } from "@firebase/util";
import logoImage from "./../../assets/blood-bank-zichron-logo.svg";

export interface SignInScreenProps {
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => Promise<boolean>;
  onResetPasswordWithEmail: (
    email: string,
    emailError: (error: string) => void
  ) => Promise<boolean>;
}

export default function SignInScreen(props: SignInScreenProps) {
  const [forgot, setForgot] = useState<boolean>(false);
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

  const resetPassword = async () => {
    setIsLoading(true);
    const success = await props.onResetPasswordWithEmail(email, setEmailError);

    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.screen}>
      <CoordinatorHeader
        title=" "
        hasBackButton={forgot}
        onBack={() => setForgot(!forgot)}
      />
      <div className={styles.loginScreenLogoContainer}>
        <img src={logoImage} className={styles.loginScreenLogoImage} />
      </div>
      <div className={styles.screenContent}>
        <div className={styles.subtitle}>מערכת רכז</div>
        <div className={styles.fields}>
          <div className={styles.loginScreenSecondaryHeader}>
            {forgot ? "שכחתי סיסמה" : "התחברות"}
          </div>
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
          {!forgot && (
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
          )}
          <div className={styles.actionButton}>
            <Button
              title={forgot ? "איפוס סיסמה" : "התחברות"}
              onClick={forgot ? resetPassword : signIn}
              isLoading={isLoading}
              isDisabled={!(email && (password || forgot))}
            />
          </div>
          {!forgot && (
            <div className={styles.forgotPassContainer}>
              <Button
                className={styles.forgotPasswordBtn}
                title="שכחתי את הסיסמה"
                onClick={() => setForgot(!forgot)}
                variant={ButtonVariant.text}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
