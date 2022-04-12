import React, { useState } from "react";
import Input from "../../../components/basic/Input";
import Button from "../../../components/basic/Button";
import styles from "../signin//SignInScreen.module.scss";
import ZMScreen from "../../../components/basic/ZMScreen";
import ResetPasswordIllustration from "../../../assets/images/password reset-illustration.svg";
import Popup from "../../../components/basic/Popup";
import EmailError from "../../../assets/images/Email not found.svg";
import ResetSuccess from "../../../assets/images/Email on the way.svg";
import { InputType } from "@zm-blood-components/common";

export interface ResetPasswordScreenProps {
  onResetPassword: (
    email: string,
    onSuccess: () => void,
    onError: (error: string) => void
  ) => void;
  goToSignIn: () => void;
}

export default function ResetPasswordScreen(props: ResetPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const resetPassword = async () => {
    setLoading(true);
    const onError = (newError: string) => {
      setError(newError);
      setPopupOpen(true);
    };

    const onSuccess = () => {
      setError("");
      setPopupOpen(true);
    };

    await props.onResetPassword(email, onSuccess, onError);
    setLoading(false);
  };

  return (
    <ZMScreen className={styles.screenSection} padding hasBackButton>
      <div className={styles.screenContent}>
        <img
          src={ResetPasswordIllustration}
          className={styles.loginIllustration}
          alt="illustration"
        />
        <div className={styles.title}>איפוס סיסמה</div>
        <Input
          onChangeText={(emailContent) => {
            setEmail(emailContent);
            setError("");
          }}
          label={`דוא״ל`}
          value={email}
          type={InputType.Email}
        />
        <div>
          <Button
            title="איפוס סיסמה"
            onClick={resetPassword}
            isDisabled={!email}
            isLoading={loading}
          />
        </div>
      </div>

      <Popup
        open={popupOpen}
        title={error ? "אופס" : "מייל איפוס בדרך אליך"}
        buttonApproveText={error ? "חזרה" : "סבבה"}
        onApproved={
          error
            ? () => setPopupOpen(false)
            : () => {
                props.goToSignIn();
                setPopupOpen(false);
              }
        }
        image={error ? EmailError : ResetSuccess}
      >
        {error || "ברגעים הקרובים ישלח אליך מייל עם לינק לאיפוס הסיסמה"}
      </Popup>
    </ZMScreen>
  );
}
