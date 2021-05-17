import RegisterScreen from "./RegisterScreen";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

export default function RegisterScreenContainer() {
  const history = useHistory();

  const onRegister = (
    email: string,
    password: string,
    passwordCopy: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => {
    if (!validateEmail(email)) {
      emailError("כתובת הדואר אינה תקינה");
      return;
    }

    if (password !== passwordCopy) {
      passwordError("הסיסמאות אינן תואמות");
      return;
    }

    registerUser(email, password, emailError, passwordError);
  };

  const goToSignIn = () => {
    history.goBack();
  };

  return <RegisterScreen onRegister={onRegister} goToSignIn={goToSignIn} />;
}

export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function registerUser(
  email: string,
  password: string,
  emailError: (error: string) => void,
  passwordError: (error: string) => void
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error: firebase.auth.Error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          emailError("כתובת הדואר נמצאת בשימוש");
          return;

        case "auth/invalid-email":
          emailError("כתובת הדואר אינה תקינה");
          return;

        case "auth/weak-password":
          passwordError("הסיסמה אינה חזקה מספיק");
          return;

        case "auth/network-request-failed":
          passwordError("בעיית רשת, אנא נסה שוב בעתיד");
          return;

        default:
          emailError(error.message);
          console.warn(
            "Register error code without translation: " + error.code
          );
          return;
      }
    });
}
