import { useState } from "react";
import styles from "./AppointmentScreen.module.scss";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";

export interface AppointmentScreenProps {
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => Promise<boolean>;
  onForgotPasswordClick: () => void;
}

export default function AppointmentScreen(props: AppointmentScreenProps) {
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
    <div className={styles.addAppoinmentScreen}>
      <div className={styles.cardContainer}>
        <div className={styles.title}>הוספת תור יחיד</div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.addApponimentSubtitle}>
          <text>זמנים</text>
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Input
              onChangeText={() => {}}
              value={email}
              type={"email"}
              label={`דוא"ל`}
              errorMessage={emailError}
            />
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Input
            onChangeText={() => {}}
            value={email}
            type={"email"}
            label={`דוא"ל`}
            errorMessage={emailError}
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.addApponimentSubtitle}>
          <text>מספר עמדות</text>
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Input
              onChangeText={() => {}}
              value={email}
              type={"email"}
              label={`דוא"ל`}
              errorMessage={emailError}
            />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.appointmentScreenInputsContainer}>
          <Button
            onClick={() => {}}
            title="אשר והמשך"
          />
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Button
            onClick={() => {}}
            title="ביטול"
            variant={ButtonVariant.outlined}
          />
        </div>
      </div>
    </div>
  );
}
