import { useState } from "react";
import styles from "./AuthScreens.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logoImage from "./../../assets/blood-bank-zichron-logo.svg";
import chevronSvg from "./../../assets/icons/chevron-right-small.svg";
import { useHistory } from "react-router-dom";



export interface ResetPasswordScreenProps {
  onResetPasswordWithEmail: (
    email: string,
    emailError: (error: string) => void
  ) => Promise<boolean>;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const resetPassword = async () => {
    setIsLoading(true);
    const success = await props.onResetPasswordWithEmail(email, setEmailError);

    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.screen}>
        <div
            className={styles.resetPasswordbackButton}
            onClick={() => history.goBack()}
        >
            <img src={chevronSvg} />
            חזרה
        </div>
      <div className={styles.authScreenLogoContainer}>
        <img src={logoImage} className={styles.authScreenLogoImage} />
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
          <div className={styles.actionButton}>
            <Button
              title={"איפוס סיסמה"}
              onClick={resetPassword}
              isLoading={isLoading}
              isDisabled={!(email)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
