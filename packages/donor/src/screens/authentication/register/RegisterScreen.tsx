import React, { useState } from "react";
import Button, { ButtonVariant } from "../../../components/basic/Button";
import styles from "../signin//SignInScreen.module.scss";
import Input from "../../../components/basic/Input";
import { Color } from "../../../constants/colors";
import ZMScreen from "../../../components/basic/ZMScreen";
import SignUpIllustration from "../../../assets/images/SignUp-illustration.svg";

export interface RegisterScreenProps {
  onRegister: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => void;
  goToSignIn: () => void;
}

const RegisterScreen: React.FunctionComponent<RegisterScreenProps> = (
  props: RegisterScreenProps
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const register = () => {
    props.onRegister(email, password, setEmailError, setPasswordError);
  };

  return (
    <ZMScreen className={styles.screenSection} padding hasBackButton>
      <div className={styles.screenContent}>
        <img
          src={SignUpIllustration}
          className={styles.loginIllustration}
          alt="illustration"
        />
        <div className={styles.title}>הרשמה</div>
        <Input
          onChangeText={(emailContent) => {
            setEmail(emailContent);
            setEmailError("");
          }}
          value={email}
          label={`דוא״ל`}
          type={"email"}
          errorMessage={emailError}
        />
        <Input
          type="password"
          onChangeText={(passwordContent) => {
            setPassword(passwordContent);
            setPasswordError("");
          }}
          value={password}
          label="סיסמה"
          errorMessage={passwordError}
        />
        <div className={styles.actionButton}>
          <Button
            title="הירשם"
            onClick={register}
            isDisabled={!(email && password)}
          />
        </div>
      </div>

      <div className={styles.alternativeContainer}>
        <span className={styles.alternativeTitle}>כבר נרשמת?</span>
        <Button
          title="התחברות"
          onClick={props.goToSignIn}
          variant={ButtonVariant.text}
          color={Color.Secondary}
          className={styles.alternativeButton}
        />
      </div>
    </ZMScreen>
  );
};

export default RegisterScreen;
