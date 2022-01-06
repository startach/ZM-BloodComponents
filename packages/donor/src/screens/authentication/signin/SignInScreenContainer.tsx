import SignInScreen from "./SignInScreen";
import { MainNavigationKeys } from "../../../navigation/app/MainNavigationKeys";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function SignInScreenContainer(props: { loggedIn: boolean }) {
  const navigate = useNavigate();
  if (props.loggedIn) {
    return <Navigate to={MainNavigationKeys.BookDonation} />;
  }

  const onRegister = () => {
    navigate(MainNavigationKeys.Register);
  };
  const onResetPassword = () => {
    navigate(MainNavigationKeys.ResetPassword);
  };

  return (
    <SignInScreen
      onSignInWithEmail={signInWithEmail}
      onRegister={onRegister}
      onResetPassword={onResetPassword}
    />
  );
}

function signInWithEmail(
  email: string,
  password: string,
  emailError: (error: string) => void,
  passwordError: (error: string) => void
) {
  return signInWithEmailAndPassword(getAuth(), email, password)
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          emailError("כתובת הדואר אינה תקינה");
          return;

        case "auth/user-not-found":
          emailError("כתובת הדואר אינה רשומה");
          return;

        case "auth/user-disabled":
          emailError("כתובת הדואר אינה פעילה");
          return;

        case "auth/wrong-password":
          passwordError("סיסמה שגויה");
          return;

        case "auth/too-many-requests":
          emailError("לא ניתן להתחבר כעת, נסה מאוחר יותר");
          return;

        case "auth/network-request-failed":
          emailError("בעיית רשת, אנא נסה שוב בעתיד");
          return;

        default:
          emailError(error.message);
          console.warn("Sing in error code without translation: " + error.code);
          return;
      }
    })
    .then((user) => Boolean(user));
}
