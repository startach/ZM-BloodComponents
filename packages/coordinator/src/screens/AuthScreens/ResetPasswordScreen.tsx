import { useState } from "react";
import styles from "./AuthScreens.module.scss";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";
import logoImage from "./../../assets/blood-bank-zichron-logo.svg";
import chevronSvg from "./../../assets/icons/chevron-right-small.svg";
import { useNavigate } from "react-router-dom";
import { Popup } from "../../components/Popup/Popup";

export interface ResetPasswordScreenProps {
  onResetPassword: (
    email: string,
    emailError: (error: string) => void
  ) => Promise<boolean>;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupError, setPopupError] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const resetPassword = async () => {
    setIsLoading(true);
    const res = await props.onResetPassword(email, setEmailError);
    setIsLoading(false);
  
    return res;
  }

  const handleResetPass = async () => {
    const resetStatus = await resetPassword()
    setPopupOpen(true);

    if (!resetStatus){
        setPopupError("כתובת המייל שלך לא נמצאה")
    }
  }

  const popupContent = (
    <div className={styles.resetPassPopupContent}>
        <img src={logoImage} className={styles.resetPassPopupImg} />
        <div className={styles.resetPassPopupTitle}>
            {popupError? "אופס" : "מייל איפוס בדרך אליך"}
        </div>
        <div className={styles.resetPassPopupMessage}>
            {popupError ?? "ברגעים הקרובים יישלח אליך מייל עם לינק לאיפוס סיסמא"}
        </div>
        <Button
          onClick={() => {
            setEmail("");
            setPopupOpen(false);
          }}
          title={popupError? "נסה/י שנית" : "לא קיבלתי, שלחו לי שוב"}
          variant={popupError? ButtonVariant.contained : ButtonVariant.text}
        />
    </div>
  );

  return (
    <div className={styles.screen}>
        <Popup
            open={popupOpen}
            onClose={() => setPopupOpen(false)}
            content={popupContent}
        />
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
              onClick={handleResetPass}
              isLoading={isLoading}
              isDisabled={!email}
            />
          </div>
        </div>
      </div>
    </div>
  );

}