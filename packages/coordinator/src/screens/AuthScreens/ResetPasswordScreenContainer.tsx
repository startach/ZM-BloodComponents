import { Navigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ResetPasswordScreenContainer(props: {
  loggedIn: boolean;
}) {
  if (props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  const onResetPassword = async (
    email: string,
    emailError: (error: string) => void
  ): Promise<void> => {
    await sendPasswordResetEmail(getAuth(), email).catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          emailError("כתובת הדואר אינה תקינה");
          break;

        case "auth/user-not-found":
          emailError("המשתמש לא נמצא");
          break;

        case "auth/too-many-requests":
          emailError("לא ניתן להתחבר כעת, נסה מאוחר יותר");
          break;

        case "auth/network-request-failed":
          emailError("בעיית רשת, אנא נסה שוב בעתיד");
          break;

        default:
          emailError(error.message);
          console.error(
            "Reset password error code without translation: " + error.code
          );
      }
    });
  };

  return <ResetPasswordScreen onResetPassword={onResetPassword} />;
}
