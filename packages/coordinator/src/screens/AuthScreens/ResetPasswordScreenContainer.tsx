import { Navigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../store/login/LoginStatusSelectors";

export default function ResetPasswordScreenContainer() {
  const loggedIn = useSelector(isLoggedIn);

  if (loggedIn) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  const onResetPassword = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(getAuth(), email).catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          throw new Error("כתובת הדואר אינה תקינה");

        case "auth/user-not-found":
          throw new Error("המשתמש לא נמצא");

        case "auth/too-many-requests":
          throw new Error("לא ניתן להתחבר כעת, נסה מאוחר יותר");

        case "auth/network-request-failed":
          throw new Error("בעיית רשת, אנא נסה שוב בעתיד");

        default:
          console.error(
            "Reset password error code without translation: " + error.code
          );
          throw new Error(error.message);
      }
    });
  };

  return <ResetPasswordScreen onResetPassword={onResetPassword} />;
}
