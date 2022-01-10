import { useState } from "react";
import styles from "./AuthScreens.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logoImage from "./../../assets/blood-bank-zichron-logo.svg";
import chevronSvg from "./../../assets/icons/chevron-right-small.svg";
import { useNavigate } from "react-router-dom";

export interface ResetPasswordScreenProps {
  onResetPassword: (
    email: string,
    emailError: (error: string) => void
  ) => Promise<void>;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetPassword = async () => {
    setIsLoading(true);
    await props.onResetPassword(email, setEmailError);
    setIsLoading(false);
  };

  return (
    <div className={styles.screen}>
      <div
        className={styles.resetPasswordbackButton}
        onClick={() => navigate(-1)}
      >
        <img src={chevronSvg} alt={"back"} />
        חזרה
      </div>
      <div className={styles.authScreenLogoContainer}>
        <img
          src={logoImage}
          className={styles.authScreenLogoImage}
          alt={"logo"}
        />
      </div>
      <div className={styles.screenContent}>
        <div className={styles.subtitle}>מערכת רכז</div>
        <div className={styles.fields}>
          <div className={styles.loginScreenSecondaryHeader}>
            {"שכחתי סיסמה"}
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
          <div>
            <Button
              title={"איפוס סיסמה"}
              onClick={resetPassword}
              isLoading={isLoading}
              isDisabled={!email}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
