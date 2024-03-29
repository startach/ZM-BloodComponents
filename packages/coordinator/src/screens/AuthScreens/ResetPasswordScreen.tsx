import { useState } from "react";
import styles from "./AuthScreens.module.scss";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";
import emailNotFound from "../../assets/email_not_found.svg";
import emailOnTheWay from "../../assets/email_on_the_way.svg";
import logoImage from "./../../assets/logo_drop_ZM.svg";
import chevronSvg from "./../../assets/icons/chevron-right-small.svg";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";

export interface ResetPasswordScreenProps {
  onResetPassword: (email: string) => Promise<void>;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleResetPass = async () => {
    setIsLoading(true);
    await props
      .onResetPassword(email)
      .then(() => {
        setSuccessPopupOpen(true);
      })
      .catch((error) => {
        setEmailError(error.message);
        setErrorPopupOpen(true);
      });
    setIsLoading(false);
  };

  return (
    <div className={styles.screen}>
      <div
        className={styles.resetPasswordBackButton}
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
        <div className={styles.logoTitle}>זכרון מנחם</div>
        <div className={styles.subtitle}>מערכת רכז</div>
      </div>
      <div className={styles.screenContent}>
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
          <div className={styles.buttonsContainer}>
            <Button
              title={"איפוס סיסמה"}
              onClick={handleResetPass}
              isLoading={isLoading}
              isDisabled={!email}
            />
          </div>
        </div>
      </div>
      <Popup open={successPopupOpen} onClose={() => setSuccessPopupOpen(false)}>
        <img src={emailOnTheWay} alt="" className={styles.resetPassPopupImg} />
        <div className={styles.resetPassPopupTitle}>מייל איפוס בדרך אליך</div>
        <div className={styles.resetPassPopupMessage}>
          ברגעים הקרובים יישלח אליך מייל עם לינק לאיפוס הסיסמה
        </div>
        <Button
          className={styles.resetPasswordScreenPopupButton}
          onClick={() => {
            navigate(-1);
          }}
          title="חזרה למסך ההתחברות"
          variant={ButtonVariant.contained}
        />
        <Button
          className={styles.resetPasswordScreenPopupButton}
          onClick={() => {
            setEmailError("");
            setSuccessPopupOpen(false);
            handleResetPass();
          }}
          title="לא קיבלתי, שלחו לי שוב"
          variant={ButtonVariant.text}
        />
      </Popup>
      <Popup open={errorPopupOpen} onClose={() => setErrorPopupOpen(false)}>
        <img src={emailNotFound} alt="" className={styles.resetPassPopupImg} />
        <div className={styles.resetPassPopupTitle}>אופס</div>
        <div className={styles.resetPassPopupMessage}>{emailError}</div>
        <Button
          className={styles.resetPasswordScreenPopupButton}
          onClick={() => {
            setEmail("");
            setErrorPopupOpen(false);
          }}
          title="נסה/י שוב"
          variant={ButtonVariant.contained}
        />
      </Popup>
    </div>
  );
}
