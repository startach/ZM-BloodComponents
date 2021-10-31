import { validateEmail } from "../register/RegisterScreenContainer";
import ResetPasswordScreen from "./ResetPasswordScreen";
import { useHistory } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ResetPasswordScreenContainer() {
  const history = useHistory();

  const onResetPassword = (
    email: string,
    onSuccess: () => void,
    onError: (e: string) => void
  ) => {
    if (!validateEmail(email)) {
      onError("כתובת הדואר אינה תקינה");
      return;
    }
    sendPasswordResetEmail(getAuth(), email)
      .then(onSuccess)
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            onError("כתובת הדואר אינה תקינה");
            return;

          case "auth/user-not-found":
            onError("המשתמש לא נמצא");
            return;

          case "auth/too-many-requests":
            onError("לא ניתן להתחבר כעת, נסה מאוחר יותר");
            return;

          case "auth/network-request-failed":
            onError("בעיית רשת, אנא נסה שוב בעתיד");
            return;

          default:
            onError(error.message);
            console.error(
              "Reset password error code without translation: " + error.code
            );
            return;
        }
      });
  };

  const goToSignIn = () => {
    history.goBack();
  };

  return (
    <ResetPasswordScreen
      onResetPassword={onResetPassword}
      goToSignIn={goToSignIn}
    />
  );
}
