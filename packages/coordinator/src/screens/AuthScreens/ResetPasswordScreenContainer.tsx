import { Navigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ResetPasswordScreenContainer(props: {
  loggedIn: boolean;
}) {
  if (props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULED_APPOINTMENTS} />;
  }

  const onResetPassword = async (
    email: string,
    emailError: (error: string) => void
  ) => {
    await sendPasswordResetEmail(getAuth(), email).catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          emailError("כתובת הדואר אינה תקינה");
          return;

        case "auth/user-not-found":
          emailError("המשתמש לא נמצא");
          return;

        case "auth/too-many-requests":
          emailError("לא ניתן להתחבר כעת, נסה מאוחר יותר");
          return;

        case "auth/network-request-failed":
          emailError("בעיית רשת, אנא נסה שוב בעתיד");
          return;

        default:
          emailError(error.message);
          console.error(
            "Reset password error code without translation: " + error.code
          );
          return;
      }
    });
  };

  return <ResetPasswordScreen onResetPassword={onResetPassword} />;
}
