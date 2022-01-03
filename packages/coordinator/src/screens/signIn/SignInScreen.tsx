import { useState } from "react";
import styles from "./SignInScreen.module.scss";
import CoordinatorHeader from "../../components/CoordinatorHeader";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";

export interface SignInScreenProps {
  onSignInWithEmail: (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => Promise<boolean>;
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
    <div className={styles.screen}>
      <CoordinatorHeader
        title={"זכרון מנחם - התחברות רכזים"}
        variant={HeaderVariant.SECONDARY}
      />
      <div className={styles.screenContent}>
        <div className={styles.fields}>
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
          <div className={styles.actionButton}>
            <Button
              title="התחברות"
              onClick={signIn}
              isLoading={isLoading}
              isDisabled={!(email && password)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
