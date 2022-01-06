import RegisterScreen from "./RegisterScreen";
import { MainNavigationKeys } from "../../../navigation/app/MainNavigationKeys";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function RegisterScreenContainer(props: { loggedIn: boolean }) {
  const navigate = useNavigate();
  if (props.loggedIn) {
    return <Navigate to={"/" + MainNavigationKeys.BookDonation} />;
  }

  const onRegister = (
    email: string,
    password: string,
    emailError: (error: string) => void,
    passwordError: (error: string) => void
  ) => {
    if (!validateEmail(email)) {
      emailError("כתובת הדואר אינה תקינה");
      return;
    }

    registerUser(email, password, emailError, passwordError);
  };

  const goToSignIn = () => {
    navigate(MainNavigationKeys.Login);
  };

  return <RegisterScreen onRegister={onRegister} goToSignIn={goToSignIn} />;
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function registerUser(
  email: string,
  password: string,
  emailError: (error: string) => void,
  passwordError: (error: string) => void
) {
  createUserWithEmailAndPassword(getAuth(), email, password).catch((error) => {
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
        console.warn("Register error code without translation: " + error.code);
        return;
    }
  });
}
