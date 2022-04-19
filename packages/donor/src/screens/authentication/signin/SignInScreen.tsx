import { useState } from "react";
import Button, { ButtonVariant } from "../../../components/basic/Button";
import styles from "./SignInScreen.module.scss";
import Input from "../../../components/basic/Input";
import { Color } from "../../../constants/colors";
import ZMScreen from "../../../components/basic/ZMScreen";
import LoginIllustration from "../../../assets/images/LogIn-illustration.svg";
import { InputType } from "@zm-blood-components/common";

export interface SignInScreenProps {
  onRegister: () => void;
  onResetPassword: () => void;
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => Promise<boolean>;
  onBack: () => void;
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
    <ZMScreen
      className={styles.screenSection}
      padding
      hasBackButton
      onBack={props.onBack}
    >
      <div className={styles.screenContent}>
        <img
          src={LoginIllustration}
          className={styles.loginIllustration}
          alt="illustration"
        />
        <div className={styles.title}>טוב לראותך שוב</div>
        <Input
          name="sign_in"
          onChangeText={(emailContent) => {
            setEmail(emailContent);
            setEmailError("");
          }}
          value={email}
          type={InputType.Email}
          label={`דוא"ל`}
          errorMessage={emailError}
        />
        <Input
          name="sign_in"
          onChangeText={(passwordContent) => {
            setPassword(passwordContent);
            setPasswordError("");
          }}
          value={password}
          label="סיסמה"
          errorMessage={passwordError}
          onSubmit={signIn}
          type={InputType.Password}
        />
        <div>
          <Button
            analyticsName="sign_in"
            title="התחברות"
            onClick={signIn}
            isLoading={isLoading}
            isDisabled={!(email && password)}
          />
        </div>
        <div className={styles.textButton}>
          <Button
            analyticsName="reset_password"
            title="שכחתי סיסמה"
            onClick={props.onResetPassword}
            variant={ButtonVariant.text}
            className={styles.textButtonColor}
          />
        </div>
      </div>

      <div className={styles.alternativeContainer}>
        <span className={styles.alternativeTitle}>עדיין לא נרשמת?</span>
        <Button
          analyticsName="register"
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
